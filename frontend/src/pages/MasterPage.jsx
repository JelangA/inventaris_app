import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DataTable from "../components/DataTable.jsx";
import { dataLemari } from "../api/ruanganApiTest.js";
import { getDataJurusan } from "../api/jurusanApi.js";
import { getDataRuangan } from "../api/ruanganApi.js";
import { getDataBarang } from "../api/barangApi.js";
import { getDataUser } from "../api/userApi.js";
import { getDataLemari } from "../api/lemariApi.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

function MasterPage() {
	const { param } = useParams();
	const type = param.toLowerCase();
	const { jurusan, ruangan, setJurusan, setRuangan } = useStateContext();
    const [data, setData] = useState([]);

	let passedData = data;
	let passedSetData = setData;

	useEffect(() => {
        const fetchData = async () => {
            let fetchedData = [];
            switch (type) {
                case "jurusan":
					passedData = jurusan;
					passedSetData = setJurusan;
                    await getDataJurusan().then((res) => {
                        fetchedData = res;
                    })
                    break;
                case "ruangan":
					passedData = ruangan;
					passedSetData = setRuangan;
                    await getDataRuangan().then((res) => {
                        fetchedData = res;
                    })
                    break;
                case "lemari":
                    await getDataLemari().then((res) => {
                        fetchedData = res;
                    })
                    break;
                case "barang":
                    await getDataBarang().then((res) => {
                        fetchedData = res;
                    })
                    break;
                case "user":
                    await getDataUser().then((res) => {
                        fetchedData = res;
                    })
                    break;
                default:
                    fetchedData = [];
            }
            setData(fetchedData);
        }
        fetchData();
	}, [param]);
    
	return (
		<div className="content-wrapper">
			<section className="content-header">
				<div className="container-fluid">
					<div className="row mb-2">
						<div className="col-sm-6">
							<h1>Data {formatString(param)}</h1>
						</div>
						<div className="col-sm-6">
							<ol className="breadcrumb float-sm-right">
								<li className="breadcrumb-item">
									<Link to="/">Home</Link>
								</li>
								<li className="breadcrumb-item active">
									Master
								</li>
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
									<DataTable data={passedData} setData={passedSetData} type={type} />
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
		.split("-") // Split the string by hyphen
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
		.join(" "); // Join the words with a space
}

export default MasterPage;
