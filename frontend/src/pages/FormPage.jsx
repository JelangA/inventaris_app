import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	addDataRuangan,
	editDataRuangan,
	getDataRuanganById,
} from "../api/ruanganApi.js";
import {
	addDataBarang,
	editDataBarang,
	getDataBarang,
} from "../api/barangApi.js";
import {
	addDataPenempatanLemari,
	editDataPenempatanLemari,
} from "../api/penempatanLApi.js";
import {
	addDataPenempatanRuangan,
	editDataPenempatanRuangan,
} from "../api/penempatanRApi.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { getDataLemari } from "../api/lemariApi";

export default function FormPage() {
	const { param, id } = useParams();
	const navigate = useNavigate();
	const { jurusan, ruangan } = useStateContext();
	const [formData, setFormData] = useState({});
	const [penempatanData, setPenempatanData] = useState({
		id_ruangan: -1,
		id_lemari: -1,
	});
	const [preview, setPreview] = useState(null);
	const [previews, setPreviews] = useState([]); // delete
	const [lemari, setLemari] = useState([]);
	const [loading, setLoading] = useState(true);
	const [penempatan, setPenempatan] = useState("");

	useEffect(() => {
		const fetchRuanganDataById = async () => {
			await getDataRuanganById(id).then((res) => {
				setFormData(res);
			});
		};
		const fetchBarangDataById = async () => {
			await getDataBarang().then((res) => {
				setFormData(res.find((item) => item.id == id));
			});
		};
		const fetchLemariData = async () => {
			await getDataLemari().then((res) => {
				setLemari(res);
			});
		};
		const fetchData = async () => {
			if (param === "ruangan") {
				if (id) {
					await fetchRuanganDataById();
				} else {
					setFormData({
						nama_ruangan: "",
						luas_ruangan: 0,
						foto_ruangan: null,
						inventaris_sapras: "",
					});
				}
			} else {
				if (id) {
					await fetchBarangDataById();
				} else {
					setFormData({
						no_inventaris: null,
						nama_barang: "",
						jenis_sarana: "",
						foto_barang: null,
						spesifikasi: "",
						id_penempatan: -1,
						satuan: "",
						jml_layak_pakai: 0,
						jml_tidak_layak_pakai: 0,
						sumber: "",
						pengadaan: null,
					});
				}
			}
			await fetchLemariData();
			setLoading(false);
		};
		fetchData();
	}, [param, id]);

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		if (param === "ruangan") {
			if (id) {
				// Edit Ruangan
				await editDataRuangan(id, formData)
					.then(() => {
						navigate(`/master/${param}`);
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				// Create Ruangan
				await addDataRuangan(formData)
					.then(() => {
						navigate(`/master/${param}`);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		} else {
			if (id) {
				// Edit Barang
				await editDataBarang(id, formData)
					.then(async () => {
						if (penempatan === "ruangan") {
							await editDataPenempatanRuangan(id, penempatanData)
								.then(() => navigate(`/master/${param}`))
								.catch((err) => console.log(err));
						} else {
							await editDataPenempatanLemari(id, penempatanData)
								.then(() => navigate(`/master/${param}`))
								.catch((err) => console.log(err));
						}
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				// Create Barang
			await addDataBarang(formData)
					.then(async (res) => {
						if (penempatan === "ruangan") {
							setPenempatanData({
								id_ruangan: penempatanData.id_ruangan,
								id_barang: res.data.data.id,
								jumlah: formData.jml_layak_pakai + formData.jml_tidak_layak_pakai,
							})
							console.log(penempatanData);
							await addDataPenempatanRuangan(penempatanData)
								.then(() => navigate(`/master/${param}`))
								.catch((err) => console.log(err));
						} else {
							setPenempatanData({
								id_lemari: penempatanData.id_lemari,
								id_barang: res.data.data.id,
								jumlah: formData.jml_layak_pakai + formData.jml_tidak_layak_pakai,
							})
							console.log(penempatanData);
							await addDataPenempatanLemari(penempatanData)
								.then(() => navigate(`/master/${param}`))
								.catch((err) => console.log(err));
						}
					})
					.catch((err) => {
						console.log(err);
					});
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
		if (param === "ruangan") {
			setPreviews([]);
			const file = e.target.files;
			console.log(file);
			setFormData({ ...formData, foto_ruangan: file });
			for (let i = 0; i < file.length; i++) {
				const reader = new FileReader();
				reader.readAsDataURL(file[i]);
				reader.onloadend = () => {
					setPreviews((prev) => [...prev, reader.result]);
				};
			}
		} else {
			const file = e.target.files[0];
			console.log(file);
			setFormData({ ...formData, foto_barang: file });
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setPreview(reader.result);
			};
		}
	};

	return loading ? (
		<h1>Loading...</h1>
	) : param === "ruangan" ? (
		id ? ( // If id exists, Edit Ruangan
			<div className="content-wrapper">
				<section className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1>
									Form Edit{" "}
									{formData.nama_ruangan &&
										formatString(formData.nama_ruangan)}
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
													id="inputNamaRuangan"
													name="nama_ruangan"
													type="text"
													value={
														formData.nama_ruangan
													}
													placeholder="Nama Ruangan"
													onChange={(e) =>
														setFormData({
															...formData,
															nama_ruangan:
																e.target.value,
														})
													}
												/>
												<label htmlFor="inputNamaRuangan">
													Nama Ruangan
												</label>
											</div>
											<div className="form-floating mb-3">
												<input
													className="form-control"
													id="inputLuasRuangan"
													name="luas_ruangan"
													type="number"
													value={
														formData.luas_ruangan
													}
													placeholder="Luas Ruangan"
													onChange={(e) =>
														setFormData({
															...formData,
															luas_ruangan:
																e.target.value,
														})
													}
												/>
												<label htmlFor="inputLuasRuangan">
													Luas Ruangan
												</label>
											</div>
											<div className="form-floating mb-3">
												<input
													className="form-control"
													id="inputInventarisSapras"
													name="inventaris_sapras"
													type="text"
													value={
														formData.inventaris_sapras
													}
													placeholder="Inventaris Sapras"
													onChange={(e) =>
														setFormData({
															...formData,
															inventaris_sapras:
																e.target.value,
														})
													}
												/>
												<label htmlFor="inputInventarisSapras">
													Inventaris Sapras
												</label>
											</div>
											<label
												className="form-label"
												htmlFor="inputFotoRuangan">
												Foto Ruangan
											</label>
											<div className="mb-3">
												<input
													className="form-control"
													id="inputFotoRuangan"
													name="foto_ruangan"
													type="file"
													multiple
													accept="image/*"
													onChange={(e) =>
														imageUpload(
															e,
															setFormData
														)
													} // TODO
												/>
												<div className="form-floating mt-3 mb-3">
													<div
														style={{
															display: "flex",
															maxWidth: "100%",
															gap: "10px",
															flexWrap: "wrap",
														}}>
														{previews &&
															previews.map(
																(
																	preview,
																	index
																) => {
																	return (
																		<img
																			key={
																				index
																			}
																			src={
																				preview
																			}
																			style={{
																				objectFit:
																					"cover",
																			}}
																			alt="preview"
																			height="300"
																			width="300"
																		/>
																	);
																}
															)}
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
			// Else, Create Ruangan
			<div className="content-wrapper">
				<section className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1>Form Create {formatString(param)}</h1>
							</div>
							<div className="col-sm-6">
								<ol className="breadcrumb float-sm-right">
									<li className="breadcrumb-item">
										<Link to="/">Home</Link>
									</li>
									<li className="breadcrumb-item active">
										Create {formatString(param)}
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
													id="inputNamaRuangan"
													name="nama_ruangan"
													type="text"
													value={
														formData.nama_ruangan
													}
													placeholder="Nama Ruangan"
													onChange={(e) =>
														setFormData({
															...formData,
															nama_ruangan:
																e.target.value,
														})
													}
												/>
												<label htmlFor="inputNamaRuangan">
													Nama Ruangan
												</label>
											</div>
											<div className="form-floating mb-3">
												<input
													className="form-control"
													id="inputLuasRuangan"
													name="luas_ruangan"
													type="number"
													value={
														formData.luas_ruangan
													}
													placeholder="Luas Ruangan"
													onChange={(e) =>
														setFormData({
															...formData,
															luas_ruangan:
																e.target.value,
														})
													}
												/>
												<label htmlFor="inputLuasRuangan">
													Luas Ruangan
												</label>
											</div>
											<div className="form-floating mb-3">
												<input
													className="form-control"
													id="inputInventarisSapras"
													name="inventaris_sapras"
													type="text"
													value={
														formData.inventaris_sapras
													}
													placeholder="Inventaris Sapras"
													onChange={(e) =>
														setFormData({
															...formData,
															inventaris_sapras:
																e.target.value,
														})
													}
												/>
												<label htmlFor="inputInventarisSapras">
													Inventaris Sapras
												</label>
											</div>
											<label
												className="form-label"
												htmlFor="inputFotoRuangan">
												Foto Ruangan
											</label>
											<div className="mb-3">
												<input
													className="form-control"
													id="inputFotoRuangan"
													name="foto_ruangan"
													type="file"
													multiple
													accept="image/*"
													onChange={(e) =>
														imageUpload(
															e,
															setFormData
														)
													} // TODO
												/>
												<div className="form-floating mt-3 mb-3">
													<div
														style={{
															display: "flex",
															maxWidth: "100%",
															gap: "10px",
															flexWrap: "wrap",
														}}>
														{previews &&
															previews.map(
																(
																	preview,
																	index
																) => {
																	return (
																		<img
																			key={
																				index
																			}
																			src={
																				preview
																			}
																			style={{
																				objectFit:
																					"cover",
																			}}
																			alt="preview"
																			height="300"
																			width="300"
																		/>
																	);
																}
															)}
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
		)
	) : id ? ( // If id exists, Edit Barang
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
												} // TODO
											/>
											<div className="form-floating mt-3 mb-3">
												{preview && (
													<img
														src={preview}
														alt="preview"
														width="500"
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
												name="penempatan"
												id="inputPenempatan"
												value={penempatan}
												onChange={(e) =>
													setPenempatan(
														e.target.value
													)
												}>
												<option value={""} disabled>
													Pilih Penempatan
												</option>
												<option value={"ruangan"}>
													Ruangan
												</option>
												<option value={"lemari"}>
													Lemari
												</option>
											</select>
											<label htmlFor="inputPenempatan">
												Penempatan Barang
											</label>
										</div>
										{penempatan && (
											<div className="form-floating mb-3">
												{penempatan === "ruangan" ? (
													<>
														<select
															className="form-select"
															name="id_ruangan"
															id="inputIdRuangan"
															value={
																penempatanData.id_ruangan
															}
															onChange={(e) =>
																setPenempatanData(
																	penempatanData.id_ruangan = 
																	e.target
																		.value
																)
															}>
															<option
																value={""}
																disabled>
																Pilih Ruangan
															</option>
															{ruangan.map(
																(item) => {
																	return (
																		<option
																			key={
																				item.id
																			}
																			value={
																				item.id
																			}>
																			{
																				item.nama_ruangan
																			}
																		</option>
																	);
																}
															)}
														</select>
														<label htmlFor="inputIdRuangan">
															Ruangan
														</label>
													</>
												) : (
													<>
														<select
															className="form-select"
															name="id_lemari"
															id="inputIdLemari"
															value={
																penempatanData.id_lemari
															}
															onChange={(e) =>
																setPenempatanData(
																	e.target
																		.value
																)
															}>
															<option
																value={""}
																disabled>
																Pilih Lemari
															</option>
															{lemari.map(
																(item) => {
																	const namaJurusan =
																		jurusan.find(
																			(
																				jur
																			) =>
																				jur.id ==
																				item.id_jurusan
																		).jurusan;
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
																			}{" "}
																			-{" "}
																			{
																				namaJurusan
																			}
																		</option>
																	);
																}
															)}
														</select>
														<label htmlFor="inputIdLemari">
															Lemari
														</label>
													</>
												)}
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
													<input
														className="form-control"
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
														}
													/>
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
							<h1>Form Create {formatString(param)}</h1>
						</div>
						<div className="col-sm-6">
							<ol className="breadcrumb float-sm-right">
								<li className="breadcrumb-item">
									<Link to="/">Home</Link>
								</li>
								<li className="breadcrumb-item active">
									Create {formatString(param)}
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
												} // TODO
											/>
											<div className="form-floating mt-3 mb-3">
												{preview && (
													<img
														src={preview}
														alt="preview"
														width="500"
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
												name="penempatan"
												id="inputPenempatan"
												value={penempatan}
												onChange={(e) =>
													setPenempatan(
														e.target.value
													)
												}>
												<option value={""} disabled>
													Pilih Penempatan
												</option>
												<option value={"ruangan"}>
													Ruangan
												</option>
												<option value={"lemari"}>
													Lemari
												</option>
											</select>
											<label htmlFor="inputPenempatan">
												Penempatan Barang
											</label>
										</div>
										{penempatan && (
											<div className="form-floating mb-3">
												{penempatan === "ruangan" ? (
													<>
														<select
															className="form-select"
															name="id_ruangan"
															id="inputIdRuangan"
															value={
																penempatanData.id_ruangan
															}
															onChange={(e) =>
																setPenempatanData(
																	e.target
																		.value
																)
															}>
															<option
																value={""}
																disabled>
																Pilih Ruangan
															</option>
															{ruangan.map(
																(item) => {
																	return (
																		<option
																			key={
																				item.id
																			}
																			value={
																				item.id
																			}>
																			{
																				item.nama_ruangan
																			}
																		</option>
																	);
																}
															)}
														</select>
														<label htmlFor="inputIdRuangan">
															Ruangan
														</label>
													</>
												) : (
													<>
														<select
															className="form-select"
															name="id_lemari"
															id="inputIdLemari"
															value={
																penempatanData.id_lemari
															}
															onChange={(e) =>
																setPenempatanData(
																	e.target
																		.value
																)
															}>
															<option
																value={""}
																disabled>
																Pilih Lemari
															</option>
															{lemari.map(
																(item) => {
																	const namaJurusan =
																		jurusan.find(
																			(
																				jur
																			) =>
																				jur.id ==
																				item.id_jurusan
																		).jurusan;
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
																			}{" "}
																			-{" "}
																			{
																				namaJurusan
																			}
																		</option>
																	);
																}
															)}
														</select>
														<label htmlFor="inputIdLemari">
															Lemari
														</label>
													</>
												)}
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
													<input
														className="form-control"
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
														}
													/>
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
