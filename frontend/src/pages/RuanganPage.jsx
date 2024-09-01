import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataTable from "../components/DataTable.jsx";
import { dataBarang } from "../api/ruanganApiTest.js";
import axiosClient from "../api/axiosClient.js";

function RuanganPage() {
    const { namaRuanganSlug } = useParams();
    const [ruangan, setRuangan] = useState(null);

    useEffect(() => {
        // axiosClient.get(`/ruangan/${namaRuanganSlug}`)
        const fetchRuanganDetail = async () => {
            try {
                const data = JSON.parse(sessionStorage.getItem('ruanganData')) || [];
                const ruanganDetail = data.find(item =>
                    item.nama_ruangan.toLowerCase().replace(/ /g, '-') === namaRuanganSlug
                );
                setRuangan(ruanganDetail);
            } catch (error) {
                console.error('Error fetching ruangan detail:', error);
            }
        };

        fetchRuanganDetail();
    }, [namaRuanganSlug]);

    if (!ruangan) {
        return <div>Loading...</div>;
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Data Inventaris Ruangan {ruangan.nama_ruangan}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                <li className="breadcrumb-item active">{ruangan.nama_ruangan}</li>
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
                                                <label htmlFor="namaRuangan" className="col-sm-2 col-form-label">Nama Ruangan</label>
                                                <div className="col-sm-4">
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        className="form-control-plaintext"
                                                        id="namaRuangan"
                                                        value={ruangan.nama_ruangan}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-0 mt-1">
                                                <label htmlFor="luasRuangan" className="col-sm-2 col-form-label">Luas Ruangan</label>
                                                <div className="col-sm-4">
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        className="form-control-plaintext"
                                                        id="luasRuangan"
                                                        value={ruangan.luas_ruangan}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-2 mt-1">
                                                <label htmlFor="fotoRuangan" className="col-sm-2 col-form-label">Foto Ruangan</label>
                                                <div className="col-sm-4">
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        className="form-control-plaintext"
                                                        id="fotoRuangan"
                                                        value={ruangan.foto_ruangan}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <DataTable data={dataBarang} type={'barang'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default RuanganPage;
