// src/components/SideNav.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDataRuangan } from "../api/ruanganApi.js";
import { getDataJurusan } from "../api/jurusanApi.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

const SideNav = () => {
	const location = useLocation();
	const { user } = useStateContext();
	// Fetch these datas from the API
	const [ruangan, setRuangan] = useState([]);
	const [jurusan, setJurusan] = useState([]);
	const masterMenus = [
		"Jurusan",
		"Ruangan",
		"Lemari",
		"Barang",
		"Penempatan",
		"Log Pengadaan",
		"User",
		"Tipe User",
	];

	useEffect(() => {
		const fetchRuangan = async () => {
			try {
				const data = await getDataRuangan();
				setRuangan(data);
				sessionStorage.setItem("ruanganData", JSON.stringify(data));
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		const fetchJurusan = async () => {
			try {
				const data = await getDataJurusan();
				setJurusan(data);
				sessionStorage.setItem("jurusanData", JSON.stringify(data));
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchJurusan().then((r) => console.log(r));
		fetchRuangan().then((r) => console.log(r));
	}, []);

	return (
		<div>
			<aside className="main-sidebar sidebar-dark-primary elevation-4">
				<Link to="/" className="brand-link text-decoration-none">
					<div
						className="brand-image img-circle elevation-3"
						style={{
							opacity: ".8",
							backgroundColor: "#f0f0f0",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: "40px",
							width: "40px",
							borderRadius: "50%",
						}}>
						<span
							style={{
								color: "#999",
								fontSize: "1.5rem",
							}}></span>
					</div>
					<span className="brand-text font-weight-light">
						E-Inventaris
					</span>
				</Link>

				<div className="sidebar">
					<div className="user-panel mt-3 pb-3 mb-3 d-flex">
						<div className="image">
							<i className="fas fa-user-circle fa-2x"></i>
						</div>
						<div className="info">
							<Link
								to="#"
								className="d-block text-decoration-none">
								{user.nama}
							</Link>
						</div>
					</div>

					<nav className="mt-2">
						<ul
							className="nav nav-pills nav-sidebar flex-column"
							data-widget="treeview"
							role="menu"
							data-accordion="false">
							<li className="nav-item">
								<Link
									to="/"
									className={`nav-link ${
										location.pathname === "/"
											? "active"
											: ""
									}`}>
									<i className="nav-icon fas fa-home" />
									<p>Dashboard</p>
								</Link>
							</li>

							{["admin", "staf_tu"].includes(user.tipe_user) && (
								<li className="nav-item">
									<Link
										to="#"
										className={`nav-link ${
											location.pathname.includes(
												"/ruangan/ruang"
											)
												? "active"
												: ""
										}`}>
										<i className="nav-icon fas fa-door-open" />
										<p>
											Ruangan{" "}
											<i className="fas fa-angle-left right" />
										</p>
									</Link>
									<ul className="nav nav-treeview">
										{ruangan.map((item) => {
											const slug = item.nama_ruangan
												.toLowerCase()
												.replace(/ /g, "-");
											return (
												<li
													key={item.id}
													className="nav-item">
													<Link
														to={`/ruangan/${slug}`}
														className={`nav-link ${
															location.pathname ===
															`/ruangan/${slug}`
																? "active"
																: ""
														}`}>
														<i className="far fa-circle nav-icon" />
														<p>
															{item.nama_ruangan}
														</p>
													</Link>
												</li>
											);
										})}
									</ul>
								</li>
							)}
							<li className="nav-item">
								<Link
									to="#"
									className={`nav-link ${
										location.pathname.includes("/jurusan/")
											? "active"
											: ""
									}`}>
									<i className="nav-icon fas fa-school" />
									<p>
										Jurusan{" "}
										<i className="fas fa-angle-left right" />
									</p>
								</Link>
								<ul className="nav nav-treeview">
									{jurusan.map((item) => {
										const slug = item.jurusan.toLowerCase();
										return (
											<li
												key={item.id}
												className="nav-item">
												<Link
													to={`/jurusan/${slug}`}
													className={`nav-link ${
														location.pathname.includes(
															`/jurusan/${slug}`
														)
															? "active"
															: ""
													}`}>
													<i className="nav-icon far fa-circle" />
													<p>{item.jurusan}</p>
												</Link>
											</li>
										);
									})}
								</ul>
							</li>
							{user.tipe_user === "admin" ? (
								<li className="nav-header">MASTER</li>
							) : user.tipe_user === "kep_jurusan" ? (
								<li className="nav-header">JURUSAN</li>
							) : null}
							{["admin", "kep_jurusan"].includes(
								user.tipe_user
							) && (
								<li className="nav-item">
									<Link
										to="#"
										className={`nav-link ${
											location.pathname.includes(
												"/master"
											)
												? "active"
												: ""
										}`}>
										<i className="nav-icon fas fa-database" />
										<p>
											Data
											<i className="fas fa-angle-left right" />
										</p>
									</Link>
									<ul className="nav nav-treeview">
										{user.tipe_user === "kep_jurusan" ? (
											<li className="nav-item">
												<Link
													to={"/master/jurusan"}
													className={`nav-link ${
														location.pathname ===
														"/master/jurusan"
															? "active"
															: ""
													}`}>
													<i className="far fa-circle nav-icon" />
													<p>Jurusan</p>
												</Link>
											</li>
										) : (
											masterMenus.map((item) => {
												const slug = item
													.toLowerCase()
													.replace(/ /g, "-");
												return (
													<li className="nav-item">
														<Link
															to={`/master/${slug}`}
															className={`nav-link ${
																location.pathname ===
																`/master/${slug}`
																	? "active"
																	: ""
															}`}>
															<i className="far fa-circle nav-icon" />
															<p>{item}</p>
														</Link>
													</li>
												);
											})
										)}
									</ul>
								</li>
							)}
							<li className="nav-header">AKUN</li>
							<li className="nav-item">
								<Link
									to="/"
									className={`nav-link ${
										location.pathname === "/logout"
											? "active"
											: ""
									}`}>
									<i className="nav-icon fas fa-sign-out-alt" />
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
