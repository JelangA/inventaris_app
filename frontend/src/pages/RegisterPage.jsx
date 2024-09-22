import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { getDataJurusan } from "../api/jurusanApi";

export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [jurusan, setJurusan] = useState([]);
	const [formData, setFormData] = useState({
		username: "",
		name: "",
		no_hp: "",
		tipe_user: "0",
		id_jurusan: 0,
		password: "",
		passwordConfirm: "",
	});
	const [errors, setErrors] = useState({});
	const inputUsernameRef = useRef(null);
	const inputNamaRef = useRef(null);
	const inputNomorRef = useRef(null);
	const inputTipeRef = useRef(null);
	const inputJurusanRef = useRef(null);
	const inputPasswordRef = useRef(null);
	const inputPasswordConfirmRef = useRef(null);
	const navigate = useNavigate();
	const tempJurusan = [
		{
			id: 1,
			jurusan: "RPL"
		},
		{
			id: 2,
			jurusan: "TKJ"
		},
		{
			id: 3,
			jurusan: "MM"
		}
	] // TODO: Delete this line after fetching data from the API

	useEffect(() => {
		const fetchJurusan = async () => {
			await getDataJurusan().then((res) => {
				setJurusan(res);
			});
		};
		fetchJurusan();
	}, [])

	const handleInputChange = (e, ref) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});

		// Clear the error message when user starts typing
		if (value.trim()) {
			ref.current.classList.remove("is-invalid");
			setErrors({
				...errors,
				[name]: "",
				["isPasswordConfirmed"]: "",
			});
		}
	};

	const validateForm = () => {
		let formIsValid = true;
		let newErrors = {};

		if (!formData.username.trim()) {
			formIsValid = false;
			inputUsernameRef.current.classList.add("is-invalid");
			newErrors.username = "Username tidak boleh kosong";
		}
		if (!formData.name.trim()) {
			formIsValid = false;
			inputNamaRef.current.classList.add("is-invalid");
			newErrors.name = "Nama tidak boleh kosong";
		}
		if (!formData.no_hp.trim()) {
			formIsValid = false;
			inputNomorRef.current.classList.add("is-invalid");
			newErrors.no_hp = "Nomor HP tidak boleh kosong";
		}
		if (formData.tipe_user === "0") {
			formIsValid = false;
			inputTipeRef.current.classList.add("is-invalid");
			newErrors.tipe_user = "Pilih Tipe User";
		}
		if (formData.id_jurusan === 0 && formData.tipe_user === "kep_jurusan") {
			formIsValid = false;
			inputJurusanRef.current.classList.add("is-invalid");
			newErrors.id_jurusan = "Pilih Jurusan";
		}
		if (!formData.password.trim()) {
			formIsValid = false;
			inputPasswordRef.current.classList.add("is-invalid");
			newErrors.password = "Password tidak boleh kosong";
		}
		if (!formData.passwordConfirm.trim()) {
			formIsValid = false;
			inputPasswordConfirmRef.current.classList.add("is-invalid");
			newErrors.passwordConfirm =
				"Konfirmasi Password tidak boleh kosong";
		}
		if (
			formData.password.trim() &&
			formData.passwordConfirm.trim() &&
			formData.password !== formData.passwordConfirm
		) {
			formIsValid = false;
			inputPasswordRef.current.classList.add("is-invalid");
			inputPasswordConfirmRef.current.classList.add("is-invalid");
			newErrors.isPasswordConfirmed = "Password tidak cocok";
		}

		setErrors(newErrors);
		return formIsValid;
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			const payload = {
				username: formData.username,
				name: formData.name,
				no_hp: formData.no_hp,
				tipe_user: formData.tipe_user,
				id_jurusan: formData.id_jurusan,
				password: formData.password,
			};
			axiosClient
				.post("/register", payload)
				.then((res) => {
					console.log("Form Submitted:", formData);
					console.log(res);
					navigate("/login");
				})
				.catch((err) => {
					setErrors({
						login:
							err.response?.data?.message ||
							"Login gagal, periksa kredensial Anda.",
					});
				});
		}
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-lg-7">
					<div className="card shadow-lg border-0 rounded-lg mt-5">
						<div className="card-header">
							<h3 className="text-center font-weight-light my-4">
								Buat Akun
							</h3>
						</div>
						<div className="card-body">
							{errors.login && (
								<div
									className="alert alert-danger"
									role="alert">
									{errors.login}
								</div>
							)}
							<form onSubmit={onSubmit}>
								<div className="form-floating mb-3">
									<input
										className="form-control"
										id="inputUsername"
										type="text"
										name="username"
										ref={inputUsernameRef}
										value={formData.username}
										placeholder="Username"
										onChange={(e) =>
											handleInputChange(
												e,
												inputUsernameRef
											)
										}
									/>
									<label htmlFor="inputUsername">
										Username
									</label>
									{errors.username && (
										<p
											style={{
												color: "red",
												fontSize: 13,
											}}>
											{errors.username}
										</p>
									)}
								</div>
								<div className="form-floating mb-3">
									<input
										className="form-control"
										id="inputNama"
										type="text"
										name="name"
										ref={inputNamaRef}
										value={formData.name}
										placeholder="Nama"
										onChange={(e) =>
											handleInputChange(e, inputNamaRef)
										}
									/>
									<label htmlFor="inputNama">Nama</label>
									{errors.name && (
										<p
											style={{
												color: "red",
												fontSize: 13,
											}}>
											{errors.name}
										</p>
									)}
								</div>
								<div className="form-floating mb-3">
									<input
										className="form-control"
										id="inputNomor"
										type="tel"
										name="no_hp"
										ref={inputNomorRef}
										value={formData.no_hp}
										placeholder="Nomor HP"
										onChange={(e) =>
											handleInputChange(e, inputNomorRef)
										}
									/>
									<label htmlFor="inputNomor">Nomor HP</label>
									{errors.no_hp && (
										<p
											style={{
												color: "red",
												fontSize: 13,
											}}>
											{errors.no_hp}
										</p>
									)}
								</div>
								<div className="form-floating mb-3">
									<select
										className="form-select"
										id="inputTipe"
										ref={inputTipeRef}
										value={formData.tipe_user}
										onChange={(e) =>
											handleInputChange(e, inputTipeRef)
										}
										name="tipe_user">
										<option value="0" disabled>
											Pilih Opsi
										</option>
										<option value="admin">Admin</option>
										<option value="staf_tu">
											Staff TU
										</option>
										<option value="kep_jurusan">
											Kepala Jurusan
										</option>
										<option value="kep_bengkel">
											Kepala Bengkel
										</option>
									</select>
									<label htmlFor="inputTipe">Tipe User</label>
									{errors.tipe_user && (
										<p
											style={{
												color: "red",
												fontSize: 13,
											}}>
											{errors.tipe_user}
										</p>
									)}
								</div>
								{tempJurusan.length > 0 && formData.tipe_user === "kep_jurusan" && (
									<div className="form-floating mb-3">
										<select
											className="form-select"
											id="inputJurusan"
											ref={inputJurusanRef}
											value={formData.id_jurusan}
											onChange={(e) =>
												handleInputChange(
													e,
													inputJurusanRef
												)
											}
											name="id_jurusan">
											<option value={0} disabled>
												Pilih Opsi
											</option>
											{tempJurusan.map((item) => {
												return (
													<option value={item.id}>
														{item.jurusan}
													</option>
												)
											})}
										</select>
										<label htmlFor="inputJurusan">
											Jurusan
										</label>
										{errors.id_jurusan && (
											<p
												style={{
													color: "red",
													fontSize: 13,
												}}>
												{errors.id_jurusan}
											</p>
										)}
									</div>
								)}
								<div className="row mb-3">
									<div className="col-md-6">
										<div className="form-floating mb-3 mb-md-0">
											<input
												className="form-control"
												id="inputPassword"
												type={
													showPassword
														? "text"
														: "password"
												}
												ref={inputPasswordRef}
												name="password"
												value={formData.password}
												placeholder="Password"
												onChange={(e) =>
													handleInputChange(
														e,
														inputPasswordRef
													)
												}
											/>
											<label htmlFor="inputPassword">
												Password
											</label>
											{errors.password && (
												<p
													style={{
														color: "red",
														fontSize: 13,
													}}>
													{errors.password}
												</p>
											)}
											{errors.isPasswordConfirmed && (
												<p
													style={{
														color: "red",
														fontSize: 13,
													}}>
													{errors.isPasswordConfirmed}
												</p>
											)}
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-floating mb-3 mb-md-0">
											<input
												className="form-control"
												id="inputPasswordConfirm"
												type={
													showPassword
														? "text"
														: "password"
												}
												ref={inputPasswordConfirmRef}
												name="passwordConfirm"
												value={formData.passwordConfirm}
												placeholder="Konfirmasi Password"
												onChange={(e) =>
													handleInputChange(
														e,
														inputPasswordConfirmRef
													)
												}
											/>
											<label htmlFor="inputPasswordConfirm">
												Konfirmasi Password
											</label>
											{errors.passwordConfirm && (
												<p
													style={{
														color: "red",
														fontSize: 13,
													}}>
													{errors.passwordConfirm}
												</p>
											)}
											{errors.isPasswordConfirmed && (
												<p
													style={{
														color: "red",
														fontSize: 13,
													}}>
													{errors.isPasswordConfirmed}
												</p>
											)}
										</div>
									</div>
								</div>
								<div className="form-check mb-3">
									<input
										type="checkbox"
										className="form-check-input"
										name="showPassword"
										id="showPassword"
										onChange={() => {
											setShowPassword(!showPassword);
										}}
									/>
									<label
										className="form-check-label"
										htmlFor="showPassword">
										Lihat Password
									</label>
								</div>
								<div className="mt-4 mb-0">
									<div className="d-grid">
										<button
											className="btn btn-primary btn-block"
											type="submit">
											Buat akun
										</button>
									</div>
								</div>
							</form>
						</div>
						<div className="card-footer text-center py-3">
							<div className="small">
								<Link to="/login">Sudah punya akun? Login</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
