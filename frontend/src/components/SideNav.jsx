// src/components/SideNav.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDataRuangan } from "../api/ruanganApi.js";
import { getDataJurusan } from "../api/jurusanApi.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import axiosClient from "../api/axiosClient.js";

const SideNav = () => {
	const location = useLocation();
	const {
		token,
		user,
		ruangan,
		jurusan,
		lemari,
		penempatan,
		setUser,
		setToken,
		setRuangan,
		setJurusan,
		setLemari,
	} = useStateContext();
	const [role, setRole] = useState("");
	// Fetch these datas from the API
	const masterMenus = [
		"Jurusan",
		"Ruangan",
		"Lemari",
		"Barang",
		"User",
	];

	useEffect(() => {
		const fetchRuangan = async () => {
			await axiosClient
				.get("/ruangan")
				.then((res) => {
					setRuangan(res.data.data);
				})
				.catch((err) => {
					setRuangan([]);
					console.error("Error fetching data:", err);
				});
		};
		const fetchJurusan = async () => {
			await axiosClient
				.get("/jurusan")
				.then((res) => {
					setJurusan(res.data.data);
				})
				.catch((err) => {
					setJurusan([]);
					console.error("Error fetching data:", err);
				});
		};
		const fetchLemari = async () => {
			await axiosClient
				.get("/lemari")
				.then((res) => {
					setLemari(res.data.data);
				})
				.catch((err) => {
					setLemari([]);
					console.error("Error fetching data:", err);
				});
		}
		switch (user?.tipe_user) {
			case "admin":
				setRole("Admin");
				break;
			case "staf_tu":
				setRole("Staf TU");
				break;
			case "kep_jurusan":
				setRole("Kepala Jurusan");
				break;
			case "kep_bengkel":
				setRole("Kepala Bengkel");
				break;
			default:
				setRole("Loading...");
		}
		fetchJurusan();
		fetchRuangan();
		fetchLemari();
	}, [user, token]);

	const onLogout = (e) => {
		e.preventDefault();
		setUser(null);
		setToken(null);
	};

	function formatString(str) {
		return str
			.split("-") // Split the string by hyphen
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
			.join(" "); // Join the words with a space
	}

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
									{user.name} - {formatString(role)}
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

								{["admin", "staf_tu"].includes(
									user.tipe_user
								) && (
									<li className="nav-item">
										<a
											href="#"
											className="nav-link">
											<i className="nav-icon fas fa-door-open" />
											<p>
												Ruangan{" "}
												<i className="fas fa-angle-left right" />
											</p>
										</a>
										<ul className="nav nav-treeview">
											{ruangan.map((item) => {
													const slug =
														item.id;
													return item.id_jurusan ? null : (
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
																	{
																		item.nama_ruangan
																	}
																</p>
															</Link>
														</li>
													);
												})}
										</ul>
									</li>
								)}
								<li className="nav-item">
									<a
										href="#"
										className="nav-link">
										<i className="nav-icon fas fa-school" />
										<p>
											Jurusan{" "}
											<i className="fas fa-angle-left right" />
										</p>
									</a>
									<ul className="nav nav-treeview">
										{jurusan.map((item) => {
												const idJurusan = item.id;

												return (
													<li
														key={item.id}
														className="nav-item">
														<a
															href="#"
															className="nav-link">
															<i className="nav-icon far fa-circle" />
															<p>
																{item.jurusan}
																<i className="fas fa-angle-left right" />
															</p>
														</a>
														<ul className="nav-treeview">
															{ruangan.map((r) => {
																if (r.id_jurusan == item.id) {
																	const idRuangan = r.id;
																	return (
																		<li
																			key={r.id}
																			className="nav-item pl-4">
																			<Link
																				to={`/ruangan/${idRuangan}`}
																				className={`nav-link ${
																					location.pathname.includes(
																						`${idRuangan}`
																					)
																						? "active"
																						: ""
																				}`}>
																				<p>
																					Ruangan{" "}
																					{
																						r.nama_ruangan
																					}
																				</p>
																			</Link>
																		</li>
																	)
																}
															})}
														</ul>
													</li>
												);
											})
										}
									</ul>
								</li>
								<li className="nav-item">
									<Link
										to="/pengadaan"
										className={`nav-link ${
											location.pathname.includes("/pengadaan")
												? "active"
												: ""
										}`}>
										<i className="nav-icon fas fa-clipboard-list" />
										<p>Pengadaan</p>
									</Link>
								</li>
								{user.tipe_user === "admin" && (
									<li className="nav-header">MASTER</li>
								)}
								{["admin"].includes(user.tipe_user) && (
									<li className="nav-item">
										<a
											href="#"
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
										</a>
										<ul className="nav nav-treeview">
											{masterMenus.map((item, index) => {
												const slug = item
													.toLowerCase()
													.replace(/ /g, "-");
												return (
													<li
														key={index}
														className="nav-item">
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
											})}
										</ul>
									</li>
								)}
								<li className="nav-header">AKUN</li>
								<li className="nav-item">
									<a
										href="#"
										onClick={onLogout}
										className="nav-link">
										<i className="nav-icon fas fa-sign-out-alt" />
										<p>Log Out</p>
									</a>
								</li>
							</ul>
						</nav>
					</div>
			</aside>
		</div>
	)
};

export default SideNav;
