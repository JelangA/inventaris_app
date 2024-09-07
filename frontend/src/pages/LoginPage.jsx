import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useStateContext } from '../contexts/ContextProvider';

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	});
	const [errors, setErrors] = useState({});
	const { token, user, ruangan, jurusan, setUser, setToken, setRuangan, setJurusan } = useStateContext();
	const inputUsernameRef = useRef(null);
	const inputPasswordRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (ruangan.length !== 0 && jurusan.length !== 0) {
			axiosClient.get('/profile').then(res => {
				const newUser = res.data.data;
				if (!user) {
					// window.location.reload();
				}
				setUser(newUser);
			}).catch(err => {
				console.log(err);
			});
		}
	}, [ruangan, jurusan]);

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
		if (token) {
			fetchJurusan();
			fetchRuangan();
		}
	}, [token]);

	useEffect(() => {
		if (user) {
			navigate('/');
			window.location.reload();
		}
	}, [user]);

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
				[name]: ''
			});
		}
	}

	const validateForm = () => {
		let formIsValid = true;
		let newErrors = {};

		if (!formData.username.trim()) {
			formIsValid = false;
			inputUsernameRef.current.classList.add('is-invalid');
			newErrors.username = 'Username tidak boleh kosong';
		}
		if (!formData.password.trim()) {
			formIsValid = false;
			inputPasswordRef.current.classList.add('is-invalid');
			newErrors.password = 'Password tidak boleh kosong';
		}

		setErrors(newErrors);
		return formIsValid;
	}

	const onSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			const payload = {
				username: formData.username,
				password: formData.password
			}
			axiosClient.post('/login', payload).then((res) => {
				const newToken = res.data.data.token;
				setToken(newToken);
			}).catch(err => {
				console.log(err);
			});
		}
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-lg-5">
					<div className="card shadow-lg border-0 rounded-lg mt-5">
						<div className="card-header">
							<h3 className="text-center font-weight-light my-4">
								Login
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
										id="inputPassword"
										type={showPassword ? "text" : "password"}
										ref={inputPasswordRef}
										name='password'
										value={formData.password}
										placeholder='Password'
										onChange={(e) => handleInputChange(e, inputPasswordRef)}
									/>
									<label htmlFor="inputPassword">Password</label>
									{errors.password && <p style={{ color: 'red', fontSize: 13 }}>{errors.password}</p>}
								</div>
								<div className="form-check mb-3">
									<input
										className="form-check-input"
										id="showPassword"
										name='showPassword'
										type="checkbox"
										onChange={() => {setShowPassword(!showPassword)}}
									/>
									<label
										className="form-check-label"
										htmlFor="inputRememberPassword">
										Lihat Password
									</label>
								</div>
								<div className="mt-4 mb-0">
									<button className="btn btn-primary btn-block" type='submit'>
										Login
									</button>
								</div>
							</form>
						</div>
						<div className="card-footer text-center py-3">
							<div className="small">
								<Link to='/Register'>
									Tidak punya akun? Buat akun
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
