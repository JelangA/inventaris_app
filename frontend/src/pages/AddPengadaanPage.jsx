import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addDataPengadaan } from "../api/pengadaanApi";
import { getDataBarang } from "../api/barangApi";

export default function AddPengadaanPage() {
	const [formData, setFormData] = useState({
		no_inventaris: -1,
		tipe_pengadaan: "default",
	});
	const [barang, setBarang] = useState([]);
	const [pengadaan, setPengadaan] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchDataBarang = async () => {
			await getDataBarang().then((res) => {
				setBarang(res);
			});
		};
		const fetchDataPengadaan = async () => {
			await getDataPengadaan().then((res) => {
				setPengadaan(res);
			});
		};
		fetchDataBarang();
		// fetchDataPengadaan();
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		const barangDetail = barang.find(
			(b) => b.no_inventaris == formData.no_inventaris
		);
		const payload = {
			barangId: barangDetail.id,
			no_inventaris: formData.no_inventaris,
			tipe_pengadaan: formData.tipe_pengadaan,
			jumlah: parseInt(formData.jumlah),
			stok_asal:
				formData.tipe_pengadaan === "barang_masuk"
					? barangDetail.jml_layak_pakai +
					  barangDetail.jml_tidak_layak_pakai
					: barangDetail.jml_layak_pakai -
					  barangDetail.jml_tidak_layak_pakai,
			tanggal: new Date().toISOString().slice(0, 19).replace("T", " "),
		};
		console.log(payload);
		addDataPengadaan(payload)
			.then(() => {
				navigate("/pengadaan");
				window.location.reload();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div className="content-wrapper">
			<section className="content-header">
				<div className="container-fluid">
					<div className="row mb-2">
						<div className="col-sm-6">
							<h1>Tambah Data Pengadaan</h1>
						</div>
						<div className="col-sm-6">
							<ol className="breadcrumb float-sm-right">
								<li className="breadcrumb-item">
									<Link to="/">Home</Link>
								</li>
								<li className="breadcrumb-item active">
									Pengadaan
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
											<div className="form-floating mb-3">
												<select
													className="form-select"
													id="noInventaris"
													value={
														formData.no_inventaris
													}
													onChange={(e) =>
														setFormData({
															...formData,
															no_inventaris:
																e.target.value,
														})
													}
													name="no_inventaris">
													<option value="-1" disabled>
														Pilih No Inventaris
													</option>
													{barang.map((b) => (
														<option
															value={
																b.no_inventaris
															}>
															{b.no_inventaris} -{" "}
															{b.nama_barang}
														</option>
													))}
												</select>
												<label htmlFor="noInventaris">
													No Inventaris
												</label>
											</div>
										</div>
										<div className="form-floating mb-3">
											<select
												className="form-select"
												id="inputTipePengadaan"
												placeholder="Tipe Pengadaan"
												value={formData.tipe_pengadaan}
												onChange={(e) =>
													setFormData({
														...formData,
														tipe_pengadaan:
															e.target.value,
													})
												}>
												<option
													value="default"
													disabled>
													Pilih Tipe Pengadaan
												</option>
												<option value="barang_masuk">
													Barang Masuk
												</option>
												<option value="barang_keluar">
													Barang Keluar
												</option>
											</select>
											<label htmlFor="inputTipePengadaan">
												Tipe Pengadaan
											</label>
										</div>
										<div className="form-floating mb-3">
											<input
												className="form-control"
												id="inputJumlah"
												type="number"
												placeholder="Jumlah"
												value={formData.jumlah}
												onChange={(e) =>
													setFormData({
														...formData,
														jumlah: e.target.value,
													})
												}
											/>
											<label htmlFor="inputJumlah">
												Jumlah
											</label>
										</div>
										<div className="mt-4 mb-0">
											<div className="d-grid">
												<button
													type="submit"
													className="btn btn-primary btn-block"
													href="login.html">
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
