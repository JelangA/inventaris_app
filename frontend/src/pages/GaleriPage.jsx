import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function GaleriPage() {
	const { id } = useParams();
	const [previews, setPreviews] = useState([]);
	const [formData, setFormData] = useState({
		id_ruangan: id
	});
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		axiosClient.post('/galeriRuangan', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
			.then(res => {
				console.log(res);
				navigate(`/ruangan/${id}`);
			})
			.catch(err => {
				console.error(err);
			});
	};
    
    const imageUpload = (e, setFormData) => {
		setPreviews([]);
		const files = Array.from(e.target.files);
		console.log(files);
		setFormData({ ...formData, foto_ruangan: files });
		for (let i = 0; i < files.length; i++) {
			const reader = new FileReader();
			reader.readAsDataURL(files[i]);
			reader.onloadend = () => {
				setPreviews(prev => [...prev, reader.result]);
			};
		}
	};

	return (
		<div className="content-wrapper">
			<section className="content-header">
				<div className="container-fluid">
					<div className="row mb-2">
						<div className="col-sm-6">
							<h1>Tambah Foto ...</h1>
						</div>
						<div className="col-sm-6">
							<ol className="breadcrumb float-sm-right">
								<li className="breadcrumb-item">
									<Link to="/">Home</Link>
								</li>
								<li className="breadcrumb-item active">tes</li>
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
										<div className="mt-4 mb-0">
											<div className="d-grid">
												<label htmlFor="inputFotoRuangan">
													Foto Ruangan
												</label>
												<div className="mb-3">
													<input
														className="form-control"
														id="inputFotoRuangan"
														type="file"
														name="foto_ruangan"
														multiple
														accept="image/*"
														onChange={(e) =>
															imageUpload(
																e,
																setFormData
															)
														}
													/>
													<div className="form-floating mt-3 mb-3">
														{previews.length > 0 && (
															previews.map((preview, index) => {
																return (
																	<div key={index}>
																		<h5 style={{margin: 0}}>Foto {index + 1}</h5>
																		<img
																			src={preview}
																			alt="previews"
																			className="shadow"
																			style={{maxWidth: '100%', maxHeight: '300px', objectFit: 'cover', marginBottom: 10, borderRadius: '0.25rem'}}
																		/>
																	</div>
																)
															})
														)}
													</div>
												</div>
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
