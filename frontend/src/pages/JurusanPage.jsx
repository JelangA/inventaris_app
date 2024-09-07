import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataTable from "../components/DataTable.jsx";
import { useStateContext } from '../contexts/ContextProvider.jsx';
import { getDataBarang } from '../api/barangApi.js';
import { getDataLemari } from '../api/lemariApi.js';
import { getDataPenempatanLemari } from "../api/penempatanLApi.js";
import { getDataPenempatanRuangan } from "../api/penempatanRApi.js";

function JurusanPage() {
    const { id } = useParams();
    const { user, jurusan } = useStateContext();
    const [barang, setBarang] = useState([]);
    const [additionalData, setAdditionalData] = useState([]);
    const [jurusanDetail, setJurusanDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [lemari, setLemari] = useState([]);
    const penempatanBarang = JSON.parse(localStorage.getItem('penempatanBarang'));

    useEffect(() => {
		if (additionalData.length !== 0) {
			setIsLoading(false);
		}
	}, [additionalData]);

    useEffect(() => {
        const fetchDataBarang = async () => {
            let fetchedAdditionalData = [];
            await getDataBarang().then((res) => {
                console.log(res);
                console.log(penempatanBarang);
                console.log(lemari);
                const barangJurusan = res.filter((brg) => penempatanBarang.find((pb) => pb.id_barang == brg.id && lemari.find((l) => l.id == pb.id_lemari && l.id_jurusan == id)));
                setBarang(barangJurusan);
            });
            await getDataPenempatanLemari().then((res) => {
                fetchedAdditionalData = [...fetchedAdditionalData, res];
            });
            await getDataPenempatanRuangan().then((res) => {
                fetchedAdditionalData = [...fetchedAdditionalData, res];
            });
            setAdditionalData(fetchedAdditionalData);
        }
        fetchDataBarang();
    }, [lemari]);

    useEffect(() => {
        const fetchDataLemari = async () => {
            await getDataLemari().then((res) => {
                const lemariJurusan = res.filter((l) => l.id_jurusan == id);
                setLemari(lemariJurusan);
            });
        }
        fetchDataLemari();
        setJurusanDetail(() => {
            let newJurusanDetail = jurusan.find((j) => j.id == id);
            return newJurusanDetail;
        });
    }, [id, jurusan]);

    if (!jurusanDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Data Barang Jurusan {jurusanDetail.jurusan}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                <li className="breadcrumb-item active">{jurusanDetail.jurusan}</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="col-md-10">
                                        <form>
                                            <div className="form-group row mb-0 mt-3">
                                                <label htmlFor="namaRuangan" className="col-sm-2 col-form-label">Nama jurusan</label>
                                                <div className="col-sm-4">
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        className="form-control-plaintext"
                                                        id="namaRuangan"
                                                        value={jurusanDetail.jurusan}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <DataTable data={barang} idRJ={id} type={'jurusanBarang'} role={user.tipe_user} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default JurusanPage;