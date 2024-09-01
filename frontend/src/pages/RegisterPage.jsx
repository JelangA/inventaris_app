import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		username: '',
		nama: '',
		nomor: '',
		tipe: '0',
		password: '',
		passwordConfirm: '',
	});
	const [errors, setErrors] = useState({});
	const inputUsernameRef = useRef(null);
	const inputNamaRef = useRef(null);
	const inputNomorRef = useRef(null);
	const inputTipeRef = useRef(null);
	const inputPasswordRef = useRef(null);
	const inputPasswordConfirmRef = useRef(null);
	const navigate = useNavigate();

	const handleInputChange = (e, ref) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});

		// Clear the error message when user starts typing
		if (value.trim()) {
			ref.current.classList.remove('is-invalid');
			setErrors({
				...errors,
				[name]: '',
				['isPasswordConfirmed']: ''
			});
		}
	}

	const validateForm = () => {
		let formIsValid = true;
		let newErrors = {};

		if (!formData.username.trim()) {
			formIsValid = false;
			// Make the input field red
			inputUsernameRef.current.classList.add('is-invalid');
			newErrors.username = 'Username tidak boleh kosong';
		}
		if (!formData.nama.trim()) {
			formIsValid = false;
			inputNamaRef.current.classList.add('is-invalid');
			newErrors.nama = 'Nama tidak boleh kosong';
		}
		if (!formData.nomor.trim()) {
			formIsValid = false;
			inputNomorRef.current.classList.add('is-invalid');
			newErrors.nomor = 'Nomor HP tidak boleh kosong';
		}
		if (formData.tipe === '0') {
			formIsValid = false;
			inputTipeRef.current.classList.add('is-invalid');
			newErrors.tipe = 'Pilih Tipe User';
		}
		if (!formData.password.trim()) {
			formIsValid = false;
			inputPasswordRef.current.classList.add('is-invalid');
			newErrors.password = 'Password tidak boleh kosong';
		}
		if (!formData.passwordConfirm.trim()) {
			formIsValid = false;
			inputPasswordConfirmRef.current.classList.add('is-invalid');
			newErrors.passwordConfirm = 'Konfirmasi Password tidak boleh kosong';
		}
		if ((formData.password.trim() && formData.passwordConfirm.trim()) && (formData.password !== formData.passwordConfirm)) {
			formIsValid = false;
			inputPasswordRef.current.classList.add('is-invalid');
			inputPasswordConfirmRef.current.classList.add('is-invalid');
			newErrors.isPasswordConfirmed = 'Password tidak cocok';
		}

		setErrors(newErrors);
		return formIsValid;
	}

	const onSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			// Handle Form Submission
			console.log('Form Submitted:', formData);
			navigate('/');
		}
	}

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
							<form onSubmit={onSubmit}>
								<div className="form-floating mb-3">
									<input
										className="form-control"
										id="inputUsername"
										type="text"
										name='username'
										ref={inputUsernameRef}
										value={formData.username}
										placeholder='Username'
										onChange={(e) => handleInputChange(e, inputUsernameRef)}
									/>
									<label htmlFor="inputUsername">
										Username
									</label>
									{errors.username && <p style={{ color: 'red', fontSize: 13 }}>{errors.username}</p>}
								</div>
								<div className="form-floating mb-3">
									<input
										className="form-control"
										id="inputNama"
										type="text"
										name='nama'
										ref={inputNamaRef}
										value={formData.nama}
										placeholder='Nama'
										onChange={(e) => handleInputChange(e, inputNamaRef)}
									/>
									<label htmlFor="inputNama">Nama</label>
									{errors.nama && <p style={{ color: 'red', fontSize: 13 }}>{errors.nama}</p>}
								</div>
								<div className="form-floating mb-3">
									<input
										className="form-control"
										id="inputNomor"
										type="tel"
										name='nomor'
										ref={inputNomorRef}
										value={formData.nomor}
										placeholder='Nomor HP'
										onChange={(e) => handleInputChange(e, inputNomorRef)}
									/>
									<label htmlFor="inputNomor">Nomor HP</label>
									{errors.nomor && <p style={{ color: 'red', fontSize: 13 }}>{errors.nomor}</p>}
								</div>
								<div className="form-floating mb-3">
									<select
										className="form-select"
										id="inputTipe"
										ref={inputTipeRef}
										value={formData.tipe}
										onChange={(e) => handleInputChange(e, inputTipeRef)}
										name='tipe'>
										<option value="0" disabled>
											Pilih Opsi
										</option>
										<option value="admin">Admin</option>
										<option value="staf_tu">Staff TU</option>
										<option value="kep_jurusan">
											Kepala Jurusan
										</option>
										<option value="kep_bengkel">
											Kepala Bengkel
										</option>
									</select>
									<label htmlFor="inputTipe">Tipe User</label>
									{errors.tipe && <p style={{ color: 'red', fontSize: 13 }}>{errors.tipe}</p>}
								</div>
								<div className="row mb-3">
									<div className="col-md-6">
										<div className="form-floating mb-3 mb-md-0">
											<input
												className="form-control"
												id="inputPassword"
												type={showPassword ? "text" : "password"}
												ref={inputPasswordRef}
												name='password'
												value={formData.password}
												placeholder='Password'
												onChange={(e) => handleInputChange(e, inputPasswordRef)}
											/>
											<label htmlFor="inputPassword">
												Password
											</label>
											{errors.password && <p style={{ color: 'red', fontSize: 13 }}>{errors.password}</p>}
											{errors.isPasswordConfirmed && <p style={{ color: 'red', fontSize: 13 }}>{errors.isPasswordConfirmed}</p>}
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-floating mb-3 mb-md-0">
											<input
												className="form-control"
												id="inputPasswordConfirm"
												type={showPassword ? "text" : "password"}
												ref={inputPasswordConfirmRef}
												name='passwordConfirm'
												value={formData.passwordConfirm}
												placeholder='Konfirmasi Password'
												onChange={(e) => handleInputChange(e, inputPasswordConfirmRef)}
											/>
											<label htmlFor="inputPasswordConfirm">
												Konfirmasi Password
											</label>
											{errors.passwordConfirm && <p style={{ color: 'red', fontSize: 13 }}>{errors.passwordConfirm}</p>}
											{errors.isPasswordConfirmed && <p style={{ color: 'red', fontSize: 13 }}>{errors.isPasswordConfirmed}</p>}
										</div>
									</div>
								</div>
								<div className="form-check mb-3">
									<input
										type="checkbox"
										className="form-check-input"
										name="showPassword"
										id="showPassword"
										onChange={() => {setShowPassword(!showPassword)}}
									/>
									<label className='form-check-label' htmlFor="showPassword">
										Lihat Password
									</label>
								</div>
								<div className="mt-4 mb-0">
									<div className="d-grid">
										<button className="btn btn-primary btn-block" type='submit'>
											Buat akun
										</button>
									</div>
								</div>
							</form>
						</div>
						<div className="card-footer text-center py-3">
							<div className="small">
								<Link to='/login'>
									Sudah punya akun? Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
