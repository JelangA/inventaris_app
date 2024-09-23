import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	addDataBarang,
	editDataBarang,
	getDataBarang,
} from "../api/barangApi.js";
import {
	addDataPenempatanRuangan,
	editDataPenempatanRuangan,
	getDataPenempatanRuangan,
	getDataPenempatanRuanganById,
} from "../api/penempatanRApi.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { getDataLemari } from "../api/lemariApi";
import { getDataSumber } from "../api/sumberApi";

export default function FormPage() {
	const { param, idRB, idJurusan, idRuangan, idLemari } = useParams();
	const navigate = useNavigate();
	const { jurusan, ruangan, barang, penempatan, setBarang, setPenempatan } =
		useStateContext();
	const [formData, setFormData] = useState({});
	const [penempatanData, setPenempatanData] = useState({
		id_lemari: -1,
		id_ruangan: -1,
		jumlah: 0,
	});
	const [penempatanDataPayload, setPenempatanDataPayload] = useState(null);
	const [preview, setPreview] = useState(null);
	const [lemari, setLemari] = useState([]);
	const [loading, setLoading] = useState(true);
	const [penempatanId, setPenempatanId] = useState(null); // id pada tabel penempatan_ruangan
	const [penempatanDetail, setPenempatanDetail] = useState(null);
	const [sumber, setSumber] = useState([]);

	// Hanya digunakan saat edit barang
	useEffect(() => {
		const fetchPenempatanDataById = async () => {
			await getDataPenempatanRuanganById(penempatanId).then((res) => {
				setPenempatanDetail(res);
			});
		};
		if (penempatanId) {
			fetchPenempatanDataById();
		}
	}, [penempatanId]);

	useEffect(() => {
		const fetchBarangDataById = async () => {
			await getDataBarang().then((res) => {
				setFormData(() => {
					let barangData = res.find((item) => item.id == idRB);
					barangData = {
						...barangData,
						pengadaan: barangData.pengadaan.split("T")[0],
					};
					return barangData;
				});
			});
		};
		const fetchLemariData = async () => {
			await getDataLemari().then((res) => {
				setLemari(res);
			});
		};
		const fetchSumberData = async () => {
			await getDataSumber().then((res) => {
				setSumber(res);
			});
		};
		const fetchPenempatanRuangan = async () => {
			await getDataPenempatanRuangan().then((res) => {
				setPenempatanData({
					id_ruangan: res.find((item) => item.id_barang == idRB)
						.id_ruangan,
					id_lemari: -1,
				});
				setPenempatanId(res.find((item) => item.id_barang == idRB).id);
			});
		};
		const fetchData = async () => {
			if (idRB || location.pathname.includes("/edit/")) {
				await fetchBarangDataById();
				await fetchPenempatanRuangan();
			} else if (!idRB || location.pathname.includes("/add/")) {
				setFormData({
					no_inventaris: null,
					nama_barang: "",
					jenis_sarana: "",
					foto_barang: null,
					spesifikasi: "",
					satuan: "",
					jml_layak_pakai: 0,
					jml_tidak_layak_pakai: 0,
					sumber: -1,
					pengadaan: null,
				});
			}
			await fetchLemariData();
			await fetchSumberData();
			setLoading(false);
		};
		fetchData();
	}, [param, idRB]);

	// Barang
	useEffect(() => {
		if (penempatanDataPayload) {
			console.log(penempatanDataPayload);
			if (location.pathname.includes("/edit/")) {
				editDataPenempatanRuangan(
					penempatanId,
					penempatanDataPayload
				).then(() => {
					window.history.back();
				});
			} else if (location.pathname.includes("/add/")) {
				addDataPenempatanRuangan(penempatanDataPayload).then(() => {
					window.history.back();
				});
			} else {
				if (idRB) {
					editDataPenempatanRuangan(
						penempatanId,
						penempatanDataPayload
					).then(() => {
						window.history.back();
					});
				} else {
					addDataPenempatanRuangan(penempatanDataPayload).then(() => {
						window.history.back();
					});
				}
			}
		}
	}, [penempatanDataPayload]);

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		if (
			Object.values(formData).some(
				(value) =>
					value === null || value === undefined || value === ""
			)
		) {
			alert("Tolong isi semua field.");
			return;
		}
		if (["ruanganBarang", "lemariBarang"].includes(param)) {
			if (location.pathname.includes("/edit/")) {
				await editDataBarang(idRB, formData).then((res) => {
					if (!res) {
						alert("No Inventaris sudah terdaftar");
						return;
					}
					setPenempatanDataPayload(() => {
						const newState = {
							id_ruangan: penempatanData.id_ruangan,
							id_lemari:
								penempatanData.id_lemari == "null"
									? null
									: penempatanData.id_lemari,
							id_barang: idRB,
							jumlah:
								parseInt(formData.jml_layak_pakai) +
								parseInt(formData.jml_tidak_layak_pakai),
						};
						console.log(newState);
						return newState;
					});
				});
			} else if (location.pathname.includes("/add/")) {
				await addDataBarang(formData).then((res) => {
					if (!res) {
						alert("No Inventaris sudah terdaftar");
						return;
					}
					setBarang([...barang, res]); // update barang state
					setPenempatanDataPayload(() => {
						const newState = {
							id_ruangan: idRuangan,
							id_lemari: idLemari,
							id_barang: res.data.data.id,
							jumlah:
								parseInt(formData.jml_layak_pakai) +
								parseInt(formData.jml_tidak_layak_pakai),
						};
						return newState;
					});
				});
			}
		} else {
			// Master
			if (idRB) {
				// Edit Barang
				await editDataBarang(idRB, formData).then((res) => {
					if (!res) {
						alert("No Inventaris sudah terdaftar");
						return;
					}
					setPenempatanDataPayload(() => {
						const newState = {
							id_ruangan: penempatanData.id_ruangan,
							id_lemari:
								penempatanData.id_lemari == "null"
									? null
									: penempatanData.id_lemari,
							id_barang: idRB,
							jumlah:
								parseInt(formData.jml_layak_pakai) +
								parseInt(formData.jml_tidak_layak_pakai),
						};
						console.log(newState);
						return newState;
					});
				});
			} else {
				// Create Barang
				await addDataBarang(formData).then((res) => {
					if (!res) {
						alert("No Inventaris sudah terdaftar");
						return;
					}
					setBarang([...barang, res]); // update barang state
					setPenempatanDataPayload(() => {
						const newState = {
							id_ruangan: penempatanData.id_ruangan,
							id_lemari:
								penempatanData.id_lemari == "null"
									? null
									: penempatanData.id_lemari,
							id_barang: res.data.data.id,
							jumlah:
								parseInt(formData.jml_layak_pakai) +
								parseInt(formData.jml_tidak_layak_pakai),
						};
						return newState;
					});
				})
			}
		}
	};

	function formatString(str) {
		return str
			.split("-") // Split the string by hyphen
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
			.join(" "); // Join the words with a space
	}

	const imageUpload = (e, setFormData) => {
		const file = e.target.files[0];
		console.log(file);
		setFormData({ ...formData, foto_barang: file });
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreview(reader.result);
		};
	};

	return loading ? (
		<h1>Loading...</h1>
	) : location.pathname.includes("/edit/") ? ( // If id exists, Edit Barang
		<div className="content-wrapper">
			<section className="content-header">
				<div className="container-fluid">
					<div className="row mb-2">
						<div className="col-sm-6">
							<h1>
								Form Edit{" "}
								{formData.nama_barang &&
									formatString(formData.nama_barang)}
							</h1>
						</div>
						<div className="col-sm-6">
							<ol className="breadcrumb float-sm-right">
								<li className="breadcrumb-item">
									<Link to="/">Home</Link>
								</li>
								<li className="breadcrumb-item active">
									Edit {formatString(param)}
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
									<form onSubmit={onSubmit}>
										<div className="form-floating mb-3">
											<input
												className="form-control"
												id="inputNoInventaris"
												type="number"
												name="no_inventaris"
												placeholder="No Inventaris"
												value={formData.no_inventaris}
												onChange={(e) =>
													setFormData({
														...formData,
														no_inventaris:
															e.target.value,
													})
												}
											/>
											<label htmlFor="inputNoInventaris">
												No Inventaris
											</label>
										</div>
										<div className="row mb-3">
											<div className="col-md-6">
												<div className="form-floating mb-3 mb-md-0">
													<input
														className="form-control"
														id="inputNamaBarang"
														type="text"
														name="nama_barang"
														placeholder="Nama Barang"
														value={
															formData.nama_barang
														}
														onChange={(e) =>
															setFormData({
																...formData,
																nama_barang:
																	e.target
																		.value,
															})
														}
													/>
													<label htmlFor="inputNamaBarang">
														Nama Barang
													</label>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-floating">
													<input
														className="form-control"
														id="inputJenisSarana"
														type="text"
														name="jenis_sarana"
														placeholder="Jenis Sarana"
														value={
															formData.jenis_sarana
														}
														onChange={(e) =>
															setFormData({
																...formData,
																jenis_sarana:
																	e.target
																		.value,
															})
														}
													/>
													<label htmlFor="inputJenisSarana">
														Jenis Sarana
													</label>
												</div>
											</div>
										</div>
										<label htmlFor="inputFotoBarang">
											Foto Barang
										</label>
										<div className="mb-3">
											<input
												className="form-control"
												id="inputFotoBarang"
												type="file"
												name="foto_barang"
												accept="image/*"
												onChange={(e) =>
													imageUpload(e, setFormData)
												}
											/>
											<div className="form-floating mt-3 mb-3">
												{preview && (
													<img
														src={preview}
														alt="preview"
														style={{
															objectFit: "cover",
															maxWidth: "300px",
															maxHeight: "300px",
														}}
													/>
												)}
											</div>
										</div>
										<div className="form-floating mb-3">
											<input
												className="form-control"
												id="inputSpesifikasi"
												type="text"
												name="spesifikasi"
												placeholder="Spesifikasi"
												value={formData.spesifikasi}
												onChange={(e) =>
													setFormData({
														...formData,
														spesifikasi:
															e.target.value,
													})
												}
											/>
											<label htmlFor="inputSpesifikasi">
												Spesifikasi
											</label>
										</div>
										<div className="form-floating mb-3">
											<select
												className="form-select"
												name="id_ruangan"
												id="inputIdRuangan"
												value={
													penempatanData.id_ruangan
												}
												onChange={(e) => {
													setPenempatanData({
														...penempatanData,
														id_ruangan:
															e.target.value,
													});
												}}>
												<option value={-1} disabled>
													Pilih Ruangan
												</option>
												{ruangan.map((item) => {
													return (
														<option
															key={item.id}
															value={item.id}>
															{item.nama_ruangan}
														</option>
													);
												})}
											</select>
											<label htmlFor="inputIdRuangan">
												Ruangan
											</label>
										</div>
										<div className="form-floating mb-3">
											<select
												className="form-select"
												name="id_lemari"
												id="inputIdLemari"
												value={penempatanData.id_lemari}
												onChange={(e) => {
													setPenempatanData({
														...penempatanData,
														id_lemari:
															e.target.value,
													});
												}}>
												<option value={-1} disabled>
													Pilih Lemari
												</option>
												<option value="null">
													Tidak disimpan di lemari
												</option>
												{lemari.map((item) => {
													if (
														item.id_ruangan ===
														penempatanData.id_ruangan
													) {
														return (
															<option
																key={item.id}
																value={item.id}>
																{item.no_lemari}
															</option>
														);
													}
													return null;
												})}
											</select>
											<label htmlFor="inputIdLemari">
												Lemari
											</label>
										</div>
										<div className="form-floating mb-3">
											<input
												className="form-control"
												id="inputSatuan"
												type="text"
												name="satuan"
												placeholder="Satuan"
												value={formData.satuan}
												onChange={(e) =>
													setFormData({
														...formData,
														satuan: e.target.value,
													})
												}
											/>
											<label htmlFor="inputSatuan">
												Satuan
											</label>
										</div>
										<div className="row mb-3">
											<div className="col-md-6">
												<div className="form-floating mb-3 mb-md-0">
													<input
														className="form-control"
														id="inputJumlahLayakPakai"
														type="number"
														name="jml_layak_pakai"
														placeholder="Jumlah Layak Pakai"
														value={
															formData.jml_layak_pakai
														}
														onChange={(e) =>
															setFormData({
																...formData,
																jml_layak_pakai:
																	e.target
																		.value,
															})
														}
													/>
													<label htmlFor="inputJumlahLayakPakai">
														Jumlah Layak Pakai
													</label>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-floating mb-3 mb-md-0">
													<input
														className="form-control"
														id="inputJumlahTidakLayakPakai"
														type="number"
														name="jml_tidak_layak_pakai"
														placeholder="Jumlah Tidak Layak Pakai"
														value={
															formData.jml_tidak_layak_pakai
														}
														onChange={(e) =>
															setFormData({
																...formData,
																jml_tidak_layak_pakai:
																	e.target
																		.value,
															})
														}
													/>
													<label htmlFor="inputJumlahTidakLayakPakai">
														Jumlah Tidak Layak Pakai
													</label>
												</div>
											</div>
										</div>
										<div className="row mb-3">
											<div className="col-md-6">
												<div className="form-floating mb-3 mb-md-0">
													<select
														className="form-select"
														id="inputSumber"
														type="text"
														name="sumber"
														placeholder="Sumber"
														value={formData.sumber}
														onChange={(e) =>
															setFormData({
																...formData,
																sumber: e.target
																	.value,
															})
														}>
														<option
															value={-1}
															disabled>
															Pilih Sumber
														</option>
														{sumber.map((item) => {
															return (
																<option
																	key={
																		item.id
																	}
																	value={
																		item.sumber
																	}>
																	{
																		item.sumber
																	}
																</option>
															);
														})}
													</select>
													<label htmlFor="inputSumber">
														Sumber
													</label>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-floating mb-3 mb-md-0">
													<input
														className="form-control"
														id="inputPengadaan"
														type="date"
														name="pengadaan"
														placeholder="Pengadaan"
														value={
															formData.pengadaan
														}
														onChange={(e) =>
															setFormData({
																...formData,
																pengadaan:
																	e.target
																		.value,
															})
														}
													/>
													<label htmlFor="inputPengadaan">
														Pengadaan{" "}
														{formData.pengadaan &&
															"- " +
																formData.pengadaan.substring(
																	0,
																	10
																)}
													</label>
												</div>
											</div>
										</div>
										<div className="mt-4 mb-0">
											<div className="d-grid">
												<button
													className="btn btn-primary btn-block"
													type="submit">
													Submit
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	) : (
		// Else, Create Barang
		<div className="content-wrapper">
			<section className="content-header">
				<div className="container-fluid">
					<div className="row mb-2">
						<div className="col-sm-6">
							<h1>Form Create Barang</h1>
						</div>
						<div className="col-sm-6">
							<ol className="breadcrumb float-sm-right">
								<li className="breadcrumb-item">
									<Link to="/">Home</Link>
								</li>
								<li className="breadcrumb-item active">
									Create Barang
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
									<form onSubmit={onSubmit}>
										<div className="form-floating mb-3">
											<input
												className="form-control"
												id="inputNoInventaris"
												type="number"
												name="no_inventaris"
												placeholder="No Inventaris"
												value={formData.no_inventaris}
												onChange={(e) =>
													setFormData({
														...formData,
														no_inventaris:
															e.target.value,
													})
												}
											/>
											<label htmlFor="inputNoInventaris">
												No Inventaris
											</label>
										</div>
										<div className="row mb-3">
											<div className="col-md-6">
												<div className="form-floating mb-3 mb-md-0">
													<input
														className="form-control"
														id="inputNamaBarang"
														type="text"
														name="nama_barang"
														placeholder="Nama Barang"
														value={
															formData.nama_barang
														}
														onChange={(e) =>
															setFormData({
																...formData,
																nama_barang:
																	e.target
																		.value,
															})
														}
													/>
													<label htmlFor="inputNamaBarang">
														Nama Barang
													</label>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-floating">
													<input
														className="form-control"
														id="inputJenisSarana"
														type="text"
														name="jenis_sarana"
														placeholder="Jenis Sarana"
														value={
															formData.jenis_sarana
														}
														onChange={(e) =>
															setFormData({
																...formData,
																jenis_sarana:
																	e.target
																		.value,
															})
														}
													/>
													<label htmlFor="inputJenisSarana">
														Jenis Sarana
													</label>
												</div>
											</div>
										</div>
										<label htmlFor="inputFotoBarang">
											Foto Barang
										</label>
										<div className="mb-3">
											<input
												className="form-control"
												id="inputFotoBarang"
												type="file"
												name="foto_barang"
												accept="image/*"
												onChange={(e) =>
													imageUpload(e, setFormData)
												}
											/>
											<div className="form-floating mt-3 mb-3">
												{preview && (
													<img
														src={preview}
														alt="preview"
														style={{
															objectFit: "cover",
															maxWidth: "300px",
															maxHeight: "300px",
														}}
													/>
												)}
											</div>
										</div>
										<div className="form-floating mb-3">
											<input
												className="form-control"
												id="inputSpesifikasi"
												type="text"
												name="spesifikasi"
												placeholder="Spesifikasi"
												value={formData.spesifikasi}
												onChange={(e) =>
													setFormData({
														...formData,
														spesifikasi:
															e.target.value,
													})
												}
											/>
											<label htmlFor="inputSpesifikasi">
												Spesifikasi
											</label>
										</div>
										{/* Non-Master */}
										{param === "ruanganBarang" ? (
											<>
												<div className="form-floating mb-3">
													<input
														className="form-control"
														type="number"
														name="id_ruangan"
														id="inputIdRuangan"
														placeholder="ID Ruangan"
														value={idRuangan}
														readOnly
													/>
													<label htmlFor="inputIdRuangan">
														ID Ruangan
													</label>
												</div>
											</>
										) : param === "lemariBarang" ? (
											<>
												<div className="form-floating mb-3">
													<input
														className="form-control"
														type="number"
														name="id_ruangan"
														id="inputIdRuangan"
														placeholder="ID Ruangan"
														value={idRuangan}
														readOnly
													/>
													<label htmlFor="inputIdRuangan">
														ID Ruangan
													</label>
												</div>
												<div className="form-floating mb-3">
													<input
														className="form-control"
														type="number"
														name="id_lemari"
														id="inputIdLemari"
														placeholder="ID Lemari"
														value={idLemari}
														readOnly
													/>
													<label htmlFor="inputIdLemari">
														ID Lemari
													</label>
												</div>
											</>
										) : (
											<div className="form-floating mb-3">
												<select
													className="form-select"
													name="id_ruangan"
													id="inputIdRuangan"
													value={
														penempatanData.id_ruangan
													}
													onChange={(e) =>
														setPenempatanData({
															...penempatanData,
															id_ruangan:
																e.target.value,
														})
													}>
													<option value={-1} disabled>
														Pilih Ruangan
													</option>
													{ruangan.map((item) => {
														return (
															<option
																key={item.id}
																value={item.id}>
																{
																	item.nama_ruangan
																}
															</option>
														);
													})}
												</select>
												<label htmlFor="inputIdRuangan">
													Ruangan
												</label>
											</div>
										)}
										{![
											"ruanganBarang",
											"lemariBarang",
										].includes(param) &&
											penempatanData.id_ruangan && (
												<div className="form-floating mb-3">
													<select
														className="form-select"
														name="id_lemari"
														id="inputIdLemari"
														value={
															penempatanData.id_lemari
														}
														onChange={(e) =>
															setPenempatanData({
																...penempatanData,
																id_lemari:
																	e.target
																		.value,
															})
														}>
														<option
															value={-1}
															disabled>
															Pilih Lemari
														</option>
														<option value="null">
															Tidak disimpan di
															lemari
														</option>
														{lemari.map((item) => {
															if (
																item.id_ruangan ===
																penempatanData.id_ruangan
															) {
																return (
																	<option
																		key={
																			item.id
																		}
																		value={
																			item.id
																		}>
																		{
																			item.no_lemari
																		}
																	</option>
																);
															}
															return null;
														})}
													</select>
													<label htmlFor="inputIdLemari">
														Lemari
													</label>
												</div>
											)}
										<div className="form-floating mb-3">
											<input
												className="form-control"
												id="inputSatuan"
												type="text"
												name="satuan"
												placeholder="Satuan"
												value={formData.satuan}
												onChange={(e) =>
													setFormData({
														...formData,
														satuan: e.target.value,
													})
												}
											/>
											<label htmlFor="inputSatuan">
												Satuan
											</label>
										</div>
										<div className="row mb-3">
											<div className="col-md-6">
												<div className="form-floating mb-3 mb-md-0">
													<input
														className="form-control"
														id="inputJumlahLayakPakai"
														type="number"
														name="jml_layak_pakai"
														placeholder="Jumlah Layak Pakai"
														value={
															formData.jml_layak_pakai
														}
														onChange={(e) =>
															setFormData({
																...formData,
																jml_layak_pakai:
																	e.target
																		.value,
															})
														}
													/>
													<label htmlFor="inputJumlahLayakPakai">
														Jumlah Layak Pakai
													</label>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-floating mb-3 mb-md-0">
													<input
														className="form-control"
														id="inputJumlahTidakLayakPakai"
														type="number"
														name="jml_tidak_layak_pakai"
														placeholder="Jumlah Tidak Layak Pakai"
														value={
															formData.jml_tidak_layak_pakai
														}
														onChange={(e) =>
															setFormData({
																...formData,
																jml_tidak_layak_pakai:
																	e.target
																		.value,
															})
														}
													/>
													<label htmlFor="inputJumlahTidakLayakPakai">
														Jumlah Tidak Layak Pakai
													</label>
												</div>
											</div>
										</div>
										<div className="row mb-3">
											<div className="col-md-6">
												<div className="form-floating mb-3 mb-md-0">
													<select
														className="form-select"
														id="inputSumber"
														type="text"
														name="sumber"
														placeholder="Sumber"
														value={formData.sumber}
														onChange={(e) =>
															setFormData({
																...formData,
																sumber: e.target
																	.value,
															})
														}>
														<option
															value={-1}
															disabled>
															Pilih Sumber
														</option>
														{sumber.map((item) => {
															return (
																<option
																	key={
																		item.id
																	}
																	value={
																		item.sumber
																	}>
																	{
																		item.sumber
																	}
																</option>
															);
														})}
													</select>
													<label htmlFor="inputSumber">
														Sumber
													</label>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-floating mb-3 mb-md-0">
													<input
														className="form-control"
														id="inputPengadaan"
														type="date"
														name="pengadaan"
														placeholder="Pengadaan"
														value={
															formData.pengadaan
														}
														onChange={(e) =>
															setFormData({
																...formData,
																pengadaan:
																	e.target
																		.value,
															})
														}
													/>
													<label htmlFor="inputPengadaan">
														Pengadaan{" "}
														{formData.pengadaan &&
															"- " +
																formData.pengadaan.substring(
																	0,
																	10
																)}
													</label>
												</div>
											</div>
										</div>
										<div className="mt-4 mb-0">
											<div className="d-grid">
												<button
													className="btn btn-primary btn-block"
													type="submit">
													Submit
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
