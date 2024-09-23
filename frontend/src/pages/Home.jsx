import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { getDataUser } from "../api/userApi";
import { getDataRuangan } from "../api/ruanganApi";
import { getDataBarang } from "../api/barangApi";
import { getDataJurusan } from "../api/jurusanApi";
import { Link } from "react-router-dom";

function Home() {
    const { user, ruangan, barang, jurusan, setRuangan, setBarang, setJurusan } = useStateContext();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchDataUsers = async () => {
            await getDataUser().then(res => setUsers(res));
        }
        const fetchDataRuangan = async () => {
            await getDataRuangan.then(res => setRuangan(res));
        }
        const fetchDataBarang = async () => {
            await getDataBarang.then(res => setBarang(res));
        }
        const fetchDataJurusan = async () => {
            await getDataJurusan.then(res => setJurusan(res));
        }
        fetchDataUsers();
        fetchDataRuangan();
        fetchDataBarang();
        fetchDataJurusan();
    }, []);

    return (
        <div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Dashboard</h1>
                            </div>
                            {/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        {/* Small boxes (Stat box) */}
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>{barang.length}</h3>
                                        <p>Barang</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-bag"/>
                                    </div>
                                    {
                                        user.tipe_user === 'admin' && (
                                            <Link className="small-box-footer" to={'/master/barang'}>More info <i
                                            className="fas fa-arrow-circle-right"/></Link>
                                        )
                                    }
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>{ruangan.length}</h3>
                                        <p>Ruangan</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-stats-bars"/>
                                    </div>
                                    {
                                        user.tipe_user === 'admin' && (
                                            <Link className="small-box-footer" to={'/master/ruangan'}>More info <i
                                            className="fas fa-arrow-circle-right"/></Link>
                                        )
                                    }
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>{users.length}</h3>
                                        <p>Users</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add"/>
                                    </div>
                                    {
                                        user.tipe_user === 'admin' && (
                                            <Link className="small-box-footer" to={'/master/user'}>More info <i
                                            className="fas fa-arrow-circle-right"/></Link>
                                        )
                                    }
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>{jurusan.length}</h3>
                                        <p>Jurusan</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-pie-graph"/>
                                    </div>
                                    {
                                        user.tipe_user === 'admin' && (
                                            <Link className="small-box-footer" to={'/master/jurusan'}>More info <i
                                            className="fas fa-arrow-circle-right"/></Link>
                                        )
                                    }
                                </div>
                            </div>
                            {/* ./col */}
                        </div>
                    </div>
                </section>
                {/* /.content */}
            </div>
        </div>
    );
}

export default Home;