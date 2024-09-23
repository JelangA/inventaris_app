import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DataTable from "../components/DataTable.jsx";
import { getDataJurusan } from "../api/jurusanApi.js";
import { getDataRuangan } from "../api/ruanganApi.js";
import { getDataBarang } from "../api/barangApi.js";
import { getDataUser } from "../api/userApi.js";
import { getDataSumber } from "../api/sumberApi.js";
import { getDataLemari } from "../api/lemariApi.js";
import { getDataPenempatanLemari } from "../api/penempatanLApi.js";
import { getDataPenempatanRuangan } from "../api/penempatanRApi.js";

function MasterPage() {
	const { param } = useParams();
	const type = param.toLowerCase();
	const [data, setData] = useState([]);
	const [additionalData, setAdditionalData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [alert, setAlert] = useState({
        status: false,
        type: '',
        message: ''
    });

	useEffect(() => {
		if (additionalData.length !== 0) {
			setIsLoading(false);
		}
	}, [additionalData]);

	useEffect(() => {
		const fetchData = async () => {
			let fetchedData = [];
			let fetchedAdditionalData = [];
			switch (type) {
				case "jurusan":
					await getDataJurusan().then((res) => {
						fetchedData = res;
					});
					break;
				case "ruangan":
					await getDataRuangan().then((res) => {
						fetchedData = res;
					});
					break;
				case "lemari":
					await getDataLemari().then((res) => {
						fetchedData = res;
					});
					break;
				case "barang":
					await getDataBarang().then((res) => {
						fetchedData = res;
					});
					await getDataPenempatanLemari().then((res) => {
						fetchedAdditionalData = [...fetchedAdditionalData, res];
					});
					await getDataPenempatanRuangan().then((res) => {
						fetchedAdditionalData = [...fetchedAdditionalData, res];
					});
					break;
				case "user":
					await getDataUser().then((res) => {
						fetchedData = res;
					});
					break;
				case "sumber":
					await getDataSumber().then((res) => {
						fetchedData = res;
					});
					break;
				default:
					fetchedData = [];
					fetchedAdditionalData = [];
					break;
			}
			setData(fetchedData);
			setAdditionalData(fetchedAdditionalData);
			if (type !== "barang") {
				setIsLoading(false);
			}
		};
		setAlert({
			status: false,
			type: '',
			message: ''
		});
		fetchData();
	}, [param]);

	if (isLoading) {
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
									{type === "barang" ? (
										<DataTable
											data={data}
											setData={setData}
											additionalData={additionalData}
											type={type}
											role={'admin'}
											alert={alert}
											setAlert={setAlert}
										/>
									) : (
										<DataTable
											data={data}
											setData={setData}
											type={type}
											role={'admin'}
											alert={alert}
											setAlert={setAlert}
										/>
									)}
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
