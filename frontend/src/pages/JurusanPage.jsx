import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataTable from "../components/DataTable.jsx";
import { useStateContext } from '../contexts/ContextProvider.jsx';
import { getDataBarang } from '../api/barangApi.js';

function JurusanPage() {
    const { id } = useParams();
    const { jurusan } = useStateContext();
    const [barang, setBarang] = useState([]);
    const [jurusanDetail, setJurusanDetail] = useState({});

    useEffect(() => {
        const fetchDataBarang = async () => {
            await getDataBarang().then((res) => {
                console.log(res)
                // const barangRuangan = res.filter((brg) => brg.)
                setBarang(res);
            })
        }
        setJurusanDetail(() => {
            let newJurusanDetail = jurusan.find((j) => j.id == id);
            return newJurusanDetail;
        });
        fetchDataBarang();
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
                            <h1>Data Lemari Jurusan {jurusanDetail.jurusan}</h1>
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
                                    <DataTable data={barang} type={'barang'} />
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