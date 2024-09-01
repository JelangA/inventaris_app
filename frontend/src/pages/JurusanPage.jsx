import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataTable from "../components/DataTable.jsx";
import { dataLemari } from "../api/ruanganApiTest.js";

function JurusanPage() {
    const { namaJurusanSlug } = useParams();
    const [jurusan, setJurusan] = useState(null);

    useEffect(() => {
        const fetchRuanganDetail = async () => {
            try {
                const data = JSON.parse(sessionStorage.getItem('jurusanData')) || [];
                const jurusanDetail = data.find(item =>
                    item.jurusan.toLowerCase() === namaJurusanSlug
                );
                setJurusan(jurusanDetail);
            } catch (error) {
                console.error('Error fetching jurusan detail:', error);
            }
        };

        fetchRuanganDetail();
    }, [namaJurusanSlug]);

    if (!jurusan) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Data Lemari Jurusan {jurusan.jurusan}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                <li className="breadcrumb-item active">{jurusan.jurusan}</li>
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
                                                        value={jurusan.jurusan}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <DataTable data={dataLemari} type={'lemari'} />
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