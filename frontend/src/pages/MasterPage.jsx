import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataTable from "../components/DataTable.jsx";
import { dataLemari } from "../api/ruanganApiTest.js";

function MasterPage() {
    const { param } = useParams();

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Data {param ? formatString(param) : 'Jurusan'}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                                <li className="breadcrumb-item active">Master</li>
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

function formatString(str) {
    return str
        .split('-') // Split the string by hyphen
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join the words with a space
}

export default MasterPage;