import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataTable from "../components/DataTable.jsx";
import { dataBarang } from "../api/ruanganApiTest.js";
import { getDataBarang } from '../api/barangApi.js';
import { useStateContext } from '../contexts/ContextProvider.jsx';
import { getDataPenempatanLemari } from "../api/penempatanLApi.js";
import { getDataPenempatanRuangan } from "../api/penempatanRApi.js";
import { deleteDataGaleri, getDataGaleri } from '../api/galeriApi.js';

function RuanganPage() {
    const { id } = useParams();
    const { user, ruangan } = useStateContext();
    const [barang, setBarang] = useState([]);
    const [additionalData, setAdditionalData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ruanganDetail, setRuanganDetail] = useState({});
    const [galeri, setGaleri] = useState([]);
    const penempatanBarang = JSON.parse(localStorage.getItem('penempatanBarang'));

    useEffect(() => {
		if (additionalData.length !== 0) {
			setIsLoading(false);
		}
	}, [additionalData]);

    useEffect(() => {
        const fetchDataGaleri = async () => {
            await getDataGaleri().then((res) => {
                const galeriRuangan = res.filter((g) => g.id_ruangan == id);
                setGaleri(galeriRuangan);
            });
        }
        const fetchDataBarang = async () => {
            let fetchedAdditionalData = [];
            await getDataBarang().then((res) => {
                const barangRuangan = res.filter((brg) => penempatanBarang.find((pb) => pb.id_barang == brg.id && pb.id_ruangan == id));
                setBarang(barangRuangan);
            });
            await getDataPenempatanLemari().then((res) => {
                fetchedAdditionalData = [...fetchedAdditionalData, res];
            });
            await getDataPenempatanRuangan().then((res) => {
                fetchedAdditionalData = [...fetchedAdditionalData, res];
            });
            setAdditionalData(fetchedAdditionalData);
        }
        setRuanganDetail(() => {
            let newRuanganDetail = ruangan.find((r) => r.id == id);
            return newRuanganDetail;
        });
        fetchDataBarang();
        fetchDataGaleri();
    }, [id, ruangan]);

    const handleDelete = async (e) => {
        e.preventDefault();
        for (let i = 0; i < galeri.length; i++) {
            await deleteDataGaleri(galeri[i].id);
        }
        setGaleri([]);
    }

    if (!ruanganDetail || isLoading) {
        return <div>Loading...</div>;
    }

    console.log(additionalData)

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Data Inventaris Ruangan {ruanganDetail.nama_ruangan}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                <li className="breadcrumb-item active">{ruanganDetail.nama_ruangan}</li>
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
                                                        value={ruanganDetail.nama_ruangan}
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
                                                        value={ruanganDetail.luas_ruangan}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-2 mt-1">
                                                <label htmlFor="fotoRuangan" className="col-sm-2 col-form-label">Foto Ruangan</label>
                                                {user.tipe_user === 'admin' && (
                                                    <div className="col-sm-4">
                                                        <Link to={`/galeri/${id}`} className='btn btn-primary'>Tambah Gambar</Link>
                                                    </div>
                                                )}
                                            </div>
                                            {
                                                galeri.length > 0 && <button onClick={handleDelete} className='btn btn-danger'>Hapus Gambar</button> 
                                            }
                                            <div className='mb-2 mt-1 d-flex flex-row flex-wrap gap-2'>
                                                {
                                                    galeri.map((g, index) => {
                                                        return (
                                                            <div key={index} className='d-flex flex-column gap-1'>
                                                                <img src={g.foto_ruangan} alt={'foto' + g.id} style={{ maxWidth: '300px', maxHeight: '300px' }} />
                                                                <p>{g.keterangan}</p>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <DataTable data={barang} additionalData={additionalData} idRJ={id} type={'ruanganBarang'} role={user.tipe_user} />
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
