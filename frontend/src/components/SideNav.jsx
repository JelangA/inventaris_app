// src/components/SideNav.js
import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import { getDataRuangan } from '../api/ruanganApi.js';
import {getDataJurusan} from "../api/jurusanApi.js";

const SideNav = () => {
    const [ruangan, setRuangan] = useState([]);
    const [jurusan, setJurusan] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchRuangan = async () => {
            try {
                const data = await getDataRuangan();
                setRuangan(data);
                sessionStorage.setItem('ruanganData', JSON.stringify(data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchJurusan = async () => {
            try {
                const data = await getDataJurusan();
                setJurusan(data);
                sessionStorage.setItem('jurusanData', JSON.stringify(data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchJurusan().then(r => console.log(r));
        fetchRuangan().then(r => console.log(r));
    }, []);


    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link to="/" className="brand-link text-decoration-none">
                    <div className="brand-image img-circle elevation-3" style={{
                        opacity: '.8',
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '40px',
                        width: '40px',
                        borderRadius: '50%'
                    }}>
                        <span style={{ color: '#999', fontSize: '1.5rem' }}></span>
                    </div>
                    <span className="brand-text font-weight-light">E-Inventaris</span>
                </Link>

                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <i className="fas fa-user-circle fa-2x"></i>
                        </div>
                        <div className="info">
                            <Link to="#" className="d-block text-decoration-none">Jelang Anugrah Raharjo</Link>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                            data-accordion="false">
                            <li className="nav-item">
                                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                                    <i className="nav-icon fas fa-tachometer-alt"/>
                                    <p>Dashboard</p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="#"
                                      className={`nav-link ${location.pathname.includes('/ruangan') ? 'active' : ''}`}>
                                    <i className="nav-icon fas fa-book"/>
                                    <p>Ruangan <i className="fas fa-angle-left right"/></p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    {ruangan.map((item) => {
                                        const slug = item.nama_ruangan.toLowerCase().replace(/ /g, '-');
                                        return (
                                            <li key={item.id} className="nav-item">
                                                <Link
                                                    to={`/ruangan/${slug}`}
                                                    className={`nav-link ${location.pathname === `/ruangan/${slug}` ? 'active' : ''}`}>
                                                    <i className="far fa-circle nav-icon"/>
                                                    <p>{item.nama_ruangan}</p>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>

                            </li>
                            {jurusan.map((item) => (
                                <li className="nav-item">
                                    <Link to={`/jurusan/${item.id}`}
                                          className={`nav-link ${location.pathname.includes(`/jurusan/${item.id}`) ? 'active' : ''}`}>
                                        <i className="nav-icon fas fa-book"/>
                                        <p>{item.jurusan}</p>
                                    </Link>
                                </li>
                            ))}

                            <li className="nav-header">MASTER</li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">
                                    <i className="nav-icon fas fa-database"/>
                                    <p>Data<i className="fas fa-angle-left right"/></p>
                                </Link>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to={'#'} className="nav-link">
                                            <i className="far fa-circle nav-icon"/>
                                            <p>Ruangan</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'#'} className="nav-link">
                                            <i className="far fa-circle nav-icon"/>
                                            <p>Jurusan</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>


                            <li className="nav-header">GENERAL</li>
                            <li className="nav-item">
                                <Link to="/" className={`nav-link ${location.pathname === '/user' ? 'active' : ''}`}>
                                    <i className="nav-icon far fa-user"/>
                                    <p>Account</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className={`nav-link ${location.pathname === '/logout' ? 'active' : ''}`}>
                                    <i className="nav-icon fas fa-sign-out-alt"/>
                                    <p>Log Out</p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    );
};
export default SideNav;
