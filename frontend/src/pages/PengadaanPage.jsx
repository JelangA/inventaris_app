import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from "../components/DataTable.jsx";
import { useStateContext } from '../contexts/ContextProvider.jsx';
import { getDataPengadaan } from '../api/pengadaanApi.js';

export default function PengadaanPage() {
    const { user } = useStateContext();
    const [alert, setAlert] = useState({ status: false, message: '', type: 'success' });
    const [pengadaan, setPengadaan] = useState([]);
    const [barang, setBarang] = useState([]);

    useEffect(() => {
        const fetchDataPengadaan = async () => {
            await getDataPengadaan().then((res) => {
                setPengadaan(res);
            });
        };
        fetchDataPengadaan();
    }, [])

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
                            <h1>Data Pengadaan</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                <li className="breadcrumb-item active">Pengadaan</li>
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
                                <div className="card-body">
                                    <DataTable data={pengadaan} setData={setPengadaan} type={'pengadaan'} role={user.tipe_user} alert={alert} setAlert={setAlert} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}