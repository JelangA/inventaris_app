import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataTable from "../components/DataTable.jsx";
import { useStateContext } from '../contexts/ContextProvider.jsx';
import { getDataBarang } from '../api/barangApi.js';
import { getDataLemari, getDataLemariById } from '../api/lemariApi.js';
import { getDataPenempatanLemari } from "../api/penempatanLApi.js";
import { getDataPenempatanRuangan } from "../api/penempatanRApi.js";

function JurusanPage() {
    const { idJurusan, idLemari } = useParams();
    const { user, jurusan } = useStateContext();
    const [barang, setBarang] = useState([]);
    const [penempatanLemari, setPenempatanLemari] = useState([]);
    const [jurusanDetail, setJurusanDetail] = useState({});
    const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    });
    const [lemari, setLemari] = useState([]);
    const [noLemari, setNoLemari] = useState('');

    useEffect(() => {
        const fetchDataBarang = async () => {
            await getDataBarang().then((res) => {
                const barangJurusan = res.filter((brg) => penempatanLemari.find((pb) => pb.id_barang == brg.id && lemari.find((l) => l.id == pb.id_lemari && l.id_jurusan == idJurusan && l.no_lemari == idLemari)));
                setBarang(barangJurusan);
            });
        }
        const fetchDataPenempatanLemari = async () => {
            await getDataPenempatanLemari().then((res) => {
                setPenempatanLemari(res);
            });
        }
        fetchDataPenempatanLemari();
        fetchDataBarang();
    }, [lemari]);

    useEffect(() => {
        const fetchDataLemariById = async () => {
            await getDataLemariById(idLemari).then((res) => {
                setNoLemari(res.no_lemari); 
            });
        }
        const fetchDataLemari = async () => {
            await getDataLemari().then((res) => {
                const lemariJurusan = res.filter((l) => l.id_jurusan == idJurusan);
                setLemari(lemariJurusan);
            });
        }
        fetchDataLemari();
        fetchDataLemariById();
        setJurusanDetail(() => {
            let newJurusanDetail = jurusan.find((j) => j.id == idJurusan);
            return newJurusanDetail;
        });
    }, [idJurusan, idLemari, jurusan]);

    if (!jurusanDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
            {
                    alert.status &&
                    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                        {alert.message}
                        <button onClick={() => setAlert({...alert, status: false})} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                }
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
                                            <div className="form-group row mb-0 mt-3">
                                                <label htmlFor="namaRuangan" className="col-sm-2 col-form-label">No Lemari</label>
                                                <div className="col-sm-4">
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        className="form-control-plaintext"
                                                        id="namaRuangan"
                                                        value={"Lemari " + noLemari}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <DataTable data={barang} setData={setBarang} idRJ={idJurusan} idLemari={idLemari} type={'jurusanBarang'} role={user.tipe_user} alert={alert} setAlert={setAlert} />
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