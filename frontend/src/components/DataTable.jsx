import React, { useEffect, useMemo, useState } from "react";
import {
	MRT_EditActionButtons,
	MaterialReactTable,
	useMaterialReactTable,
} from "material-react-table";
import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Select,
	MenuItem,
	Tooltip,
	Hidden,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	addDataJurusan,
	editDataJurusan,
	deleteDataJurusan,
	getDataJurusan,
} from "../api/jurusanApi.js";
import {
	addDataBarang,
	editDataBarang,
	deleteDataBarang,
} from "../api/barangApi.js";
import {
	addDataRuangan,
	editDataRuangan,
	deleteDataRuangan,
} from "../api/ruanganApi.js";
import {
	addDataLemari,
	editDataLemari,
	deleteDataLemari,
} from "../api/lemariApi.js";
import { addDataUser, editDataUser, deleteDataUser } from "../api/userApi.js";
import { addDataPengadaan } from "../api/pengadaanApi.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useNavigate, Link } from "react-router-dom";
import { deleteDataPenempatanLemari } from "../api/penempatanLApi.js";
import { deleteDataPenempatanRuangan } from "../api/penempatanRApi.js";

const DataTable = ({ data, setData, additionalData, idRJ, type, role }) => {
	const [validationErrors, setValidationErrors] = useState({});
	const { user, jurusan, ruangan, setJurusan, setRuangan } =
		useStateContext();
	const [penempatanBarang, setPenempatanBarang] = useState([]);
	const [penempatanLemari, setPenempatanLemari] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	// Log the additionalData when the component receives it as a prop
	useEffect(() => {
		if (type === "barang") {
			if (additionalData.length > 0) {
				setPenempatanBarang(additionalData);
			}
		}
	}, [additionalData]);

	useEffect(() => {
		if (type === "barang") {
			if (penempatanBarang.length > 0) {
				setIsLoading(false);
			}
		}
	}, [penempatanBarang]);

	useEffect(() => {
		if (type === 'lemari') {
			if (data.length > 0) {
				setPenempatanLemari(data);
			}
		}
	}, [data]);

	useEffect(() => {
		if (type === 'lemari') {
			if (penempatanLemari.length > 0) {
				setIsLoading(false);			
			}
		}
	}, [penempatanLemari]);

	const jurusanColumns = [
		{
			accessorKey: "id",
			header: "ID",
			enableEditing: false,
			size: 80,
		},
		{
			accessorKey: "jurusan",
			header: "Jurusan",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.jurusan,
				helperText: validationErrors?.jurusan,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						jurusan: undefined,
					}),
			},
		},
	];

	const barangColumns = [
		{
			accessorKey: "id",
			header: "ID",
			enableEditing: false,
			size: 80,
		},
		{
			accessorKey: "no_inventaris",
			header: "No Inventaris",
			enableEditing: false,
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.no_inventaris,
				helperText: validationErrors?.no_inventaris,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						no_inventaris: undefined,
					}),
			},
		},
		{
			accessorKey: "nama_barang",
			header: "Nama",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.nama_barang,
				helperText: validationErrors?.nama_barang,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						nama_barang: undefined,
					}),
			},
		},
		{
			accessorKey: "jenis_sarana",
			header: "Jenis",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.jenis_sarana,
				helperText: validationErrors?.jenis_sarana,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						jenis_sarana: undefined,
					}),
			},
		},
		{
			accessorKey: "foto_barang",
			header: "Foto",
			enableEditing: true,
			Cell: ({ cell }) => (
				<img
					src={cell.getValue()}
					alt="Foto"
					style={{
						width: "200px",
						height: "100px",
						objectFit: "cover",
					}}
				/>
			),
		},
		{
			accessorKey: "spesifikasi",
			header: "Spesifikasi",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.spesifikasi,
				helperText: validationErrors?.spesifikasi,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						spesifikasi: undefined,
					}),
			},
		},
		{
			accessorKey: "satuan",
			header: "Satuan",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.satuan,
				helperText: validationErrors?.satuan,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						satuan: undefined,
					}),
			},
		},
		{
			accessorKey: "jml_layak_pakai",
			header: "Jumlah Layak Pakai",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.jml_layak_pakai,
				helperText: validationErrors?.jml_layak_pakai,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						jml_layak_pakai: undefined,
					}),
			},
		},
		{
			accessorKey: "jml_tidak_layak_pakai",
			header: "Jumlah Tidak Layak Pakai",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.jml_tidak_layak_pakai,
				helperText: validationErrors?.jml_tidak_layak_pakai,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						jml_tidak_layak_pakai: undefined,
					}),
			},
		},
		{
			accessorKey: "sumber",
			header: "Sumber",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.sumber,
				helperText: validationErrors?.sumber,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						sumber: undefined,
					}),
			},
		},
		{
			accessorKey: "pengadaan",
			header: "Pengadaan",
			Cell: ({ cell }) => {
				if (cell.getValue()) {
					return cell.getValue().split("T")[0];
				}
			},
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.pengadaan,
				helperText: validationErrors?.pengadaan,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						pengadaan: undefined,
					}),
			},
		},
	];

	const barangPenempatanColumn = {
		accessorKey: "id_penempatan",
		id: "id_penempatan",
		header: "Penempatan",
		enableEditing: false,
		Cell: ({ cell }) => {
			for (let i = 0; i < penempatanBarang.length; i++) {
				const penempatan = penempatanBarang[i].find(
					(p) => p.id_barang == cell.row.original.id
				);
				if (penempatan && penempatan.id_lemari) {
					const localStorageObject = {
						id_lemari: penempatan.id_lemari,
						id_penempatan: penempatan.id,
						id_barang: cell.row.original.id,
					};
					let existingObject = JSON.parse(
						localStorage.getItem("penempatanBarang")
					);
					if (existingObject == null) {
						existingObject = [];
					}
					if (
						!existingObject.some(
							(obj) =>
								JSON.stringify(obj) ===
								JSON.stringify(localStorageObject)
						)
					) {
						existingObject.push(localStorageObject);
						localStorage.setItem(
							"penempatanBarang",
							JSON.stringify(existingObject)
						);
					}
					return (
						<Link to="/master/lemari">
							Lemari {penempatan.id_lemari}
						</Link>
					);
				}
				if (penempatan && penempatan.id_ruangan) {
					const localStorageObject = {
						id_ruangan: penempatan.id_ruangan,
						id_penempatan: penempatan.id,
						id_barang: cell.row.original.id,
					};
					let existingObject = JSON.parse(
						localStorage.getItem("penempatanBarang")
					);
					if (existingObject == null) {
						existingObject = [];
					}
					if (
						!existingObject.some(
							(obj) =>
								JSON.stringify(obj) ===
								JSON.stringify(localStorageObject)
						)
					) {
						existingObject.push(localStorageObject);
						localStorage.setItem(
							"penempatanBarang",
							JSON.stringify(existingObject)
						);
					}
					return (
						<Link to="/master/ruangan">
							Ruangan{" "}
							{
								ruangan.find(
									(r) => r.id == penempatan.id_ruangan
								).nama_ruangan
							}
						</Link>
					);
				}
			}
			return "";
		},
	};

	const ruanganColumns = [
		{
			accessorKey: "id",
			header: "ID",
			enableEditing: false,
			size: 80,
		},
		{
			accessorKey: "nama_ruangan",
			header: "Nama Ruangan",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.nama_ruangan,
				helperText: validationErrors?.nama_ruangan,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						nama_ruangan: undefined,
					}),
			},
		},
		{
			accessorKey: "luas_ruangan",
			header: "Luas Ruangan",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.luas_ruangan,
				helperText: validationErrors?.luas_ruangan,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						luas_ruangan: undefined,
					}),
			},
		},
		{
			accessorKey: "inventaris_sapras",
			header: "Inventaris Sapras",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.inventaris_sapras,
				helperText: validationErrors?.inventaris_sapras,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						inventaris_sapras: undefined,
					}),
			},
		},
	];

	const lemariColumns = [
		{
			accessorKey: "id",
			header: "ID",
			enableEditing: false,
			size: 80,
		},
		{
			accessorKey: "no_lemari",
			header: "No Lemari",
			enableEditing: true,
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.no_lemari,
				helperText: validationErrors?.no_lemari,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						no_lemari: undefined,
					}),
			},
		},
	];

	const lemariColumn = {
		accessorKey: "id_jurusan",
		id: "id_jurusan",
		header: "Jurusan",
		enableEditing: true,
		muiEditTextFieldProps: {
			select: true,
			required: true,
			error: !!validationErrors?.id_jurusan,
			helperText: validationErrors?.id_jurusan,
			onFocus: () =>
				setValidationErrors({
					...validationErrors,
					id_jurusan: undefined,
				}),
			children: jurusan.map((j) => (
				<MenuItem key={j.id} value={j.id}>
					{j.jurusan}
				</MenuItem>
			)),
		},
		Cell: ({ cell }) => {
			const penempatan = penempatanLemari.find(
				(p) => p.id == cell.row.original.id
			)
			if (penempatan) {
				return jurusan.find((j) => j.id == penempatan.id_jurusan).jurusan;
			}
			return null;
		},
	};

	const userColumns = [
		{
			accessorKey: "id",
			header: "ID",
			enableEditing: false,
			size: 80,
			muiEditTextFieldProps: {},
		},
		{
			accessorKey: "name",
			header: "Nama",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.name,
				helperText: validationErrors?.name,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						name: undefined,
					}),
			},
		},
		{
			accessorKey: "username",
			header: "Username",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.username,
				helperText: validationErrors?.username,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						username: undefined,
					}),
			},
		},
		{
			accessorKey: "tipe_user",
			header: "Tipe User",
			editSelectOptions: [
				"admin",
				"kep_jurusan",
				"kep_bengkel",
				"staf_tu",
			],
			muiEditTextFieldProps: {
				required: true,
				select: true,
				error: !!validationErrors?.tipe_user,
				helperText: validationErrors?.tipe_user,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						tipe_user: undefined,
					}),
			},
		},
		{
			accessorKey: "no_hp",
			header: "No HP",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.no_hp,
				helperText: validationErrors?.no_hp,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						no_hp: undefined,
					}),
			},
		},
		{
			accessorKey: "password",
			header: "Password",
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.password,
				helperText: validationErrors?.password,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						password: undefined,
					}),
			},
		},
	];

	const pengadaanColumns = [
		{
			accessorKey: "id",
			header: "ID",
			enableEditing: false,
			size: 80,
		},
		{
			accessorKey: "no_inventaris",
			header: "No Inventaris",
			enableEditing: true,
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.no_inventaris,
				helperText: validationErrors?.no_inventaris,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						no_inventaris: undefined,
					}),
			},
		},
		{
			accessorKey: "stok_asal",
			header: "Stok Asal",
			enableEditing: true,
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.stok_asal,
				helperText: validationErrors?.stok_asal,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						stok_asal: undefined,
					}),
			},
		},
		{
			accessorKey: "jumlah",
			header: "Jumlah",
			enableEditing: true,
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.jumlah,
				helperText: validationErrors?.jumlah,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						jumlah: undefined,
					}),
			},
		},
		{
			accessorKey: "tipe_pengadaan",
			header: "Tipe Pengadaan",
			enableEditing: true,
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.tipe_pengadaan,
				helperText: validationErrors?.tipe_pengadaan,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						tipe_pengadaan: undefined,
					}),
			},
		},
		{
			accessorKey: "tanggal",
			header: "Tanggal",
			enableEditing: true,
			muiEditTextFieldProps: {
				required: true,
				error: !!validationErrors?.tanggal,
				helperText: validationErrors?.tanggal,
				onFocus: () =>
					setValidationErrors({
						...validationErrors,
						tanggal: undefined,
					}),
			},
		},
	];

	const tableMemo = useMemo(() => {
		let tableType = {
			columns: [],
			createFunction: () => {},
			editFunction: () => {},
			deleteFunction: () => {},
		};

		switch (type) {
			case "jurusan":
				tableType.columns = jurusanColumns;
				tableType.createFunction = addDataJurusan;
				tableType.editFunction = editDataJurusan;
				tableType.deleteFunction = deleteDataJurusan;
				break;
			case "ruanganBarang":
				tableType.columns = barangColumns;
				tableType.createFunction = addDataBarang;
				tableType.editFunction = editDataBarang;
				tableType.deleteFunction = deleteDataBarang;
				break;
			case "jurusanBarang":
				tableType.columns = barangColumns;
				tableType.createFunction = addDataBarang;
				tableType.editFunction = editDataBarang;
				tableType.deleteFunction = deleteDataBarang;
				break;
			case "barang":
				tableType.columns = isLoading
					? barangColumns
					: [...barangColumns, barangPenempatanColumn];
				tableType.createFunction = addDataBarang;
				tableType.editFunction = editDataBarang;
				tableType.deleteFunction = deleteDataBarang;
				break;
			case "ruangan":
				tableType.columns = ruanganColumns;
				tableType.createFunction = addDataRuangan;
				tableType.editFunction = editDataRuangan;
				tableType.deleteFunction = deleteDataRuangan;
				break;
			case "lemari":
				tableType.columns = isLoading ? lemariColumns : [...lemariColumns, lemariColumn];
				tableType.createFunction = addDataLemari;
				tableType.editFunction = editDataLemari;
				tableType.deleteFunction = deleteDataLemari;
				break;
			case "user":
				tableType.columns = userColumns;
				tableType.createFunction = addDataUser;
				tableType.editFunction = editDataUser;
				tableType.deleteFunction = deleteDataUser;
				break;
			case "pengadaan":
				tableType.columns = pengadaanColumns;
				tableType.createFunction = addDataPengadaan;
				break;
			default:
				tableType.columns = [];
		}

		return tableType;
	}, [type, validationErrors, isLoading]);

	const columns = tableMemo.columns;

	const table = ["admin", "kep_jurusan", "kep_bengkel"].includes(role)
		? useMaterialReactTable({
				columns,
				data,
				createDisplayMode: "modal",
				editDisplayMode: "row",
				enableEditing: true,
				getRowId: (row) => row.id,
				onCreatingRowCancel: () => setValidationErrors({}),
				onCreatingRowSave: async ({ values, table }) => {
					// Tambahkan logika simpan
					let newData;
					console.log(values);
					await tableMemo.createFunction(values).then((res) => {
						console.log(res);
						newData = res.data.data;
						setData((prevData) => [...prevData, newData]);
					});
					table.setCreatingRow(null);
					if (type === "jurusan") {
						setJurusan((prevData) => [...prevData, newData]);
					}
				},
				onEditingRowCancel: () => setValidationErrors({}),
				onEditingRowSave: async ({ values, table }) => {
					await tableMemo.editFunction(values.id, values).then(() => {
						setData((prevData) =>
							prevData.map((dataElement) =>
								dataElement.id === values.id
									? values
									: dataElement
							)
						);
					});
					if (type === "jurusan") {
						setJurusan((prevData) =>
							prevData.map((dataElement) =>
								dataElement.id === values.id
									? values
									: dataElement
							)
						);
					}
					table.setEditingRow(null);
				},
				renderRowActions: ({ row, table }) =>
					type !== 'pengadaan' && (
						<Box sx={{ display: "flex", gap: "1rem" }}>
							<Tooltip title="Edit">
								<IconButton
									onClick={
										["ruangan", "barang"].includes(type)
											? () =>
													navigate(
														`/form/${type}/${row.id}`
													)
											: () => table.setEditingRow(row)
									}>
									<EditIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="Delete">
								<IconButton
									color="error"
									onClick={async () => {
										if (
											type === "user" &&
											row.id == user.id
										) {
											window.alert(
												"Tidak bisa menghapus akun yang sedang login"
											);
										} else {
											if (
												window.confirm(
													"Apakah anda yakin ingin menghapus row ini?"
												)
											) {
												await tableMemo
													.deleteFunction(row.id)
													.then(async () => {
														if (type === "barang") {
															deleteDataPenempatanLemari(
																penempatanId
															);
														}
														setData((prevData) =>
															prevData.filter(
																(r) =>
																	r.id !==
																	row.id
															)
														);
													});
												if (
													type === "jurusan" ||
													type === "ruangan"
												) {
													type === "jurusan"
														? setJurusan(
																(prevData) =>
																	prevData.filter(
																		(r) =>
																			r.id !==
																			row.id
																	)
														  )
														: setRuangan(
																(prevData) =>
																	prevData.filter(
																		(r) =>
																			r.id !==
																			row.id
																	)
														  );
												}
											}
										}
									}}>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
						</Box>
					),
				renderTopToolbarCustomActions: ({ table }) => (
					<Box sx={{ display: "flex", gap: "1rem" }}>
						{type !== "user" &&
							["admin", "kep_jurusan", "kep_bengkel"].includes(
								role
							) && (
								<Button
									variant="contained"
									onClick={
										["ruangan", "barang"].includes(type)
											? () => navigate(`/form/${type}`)
											: [
													"ruanganBarang",
													"jurusanBarang",
											  ].includes(type)
											? () =>
													navigate(
														`/form/${type}/${idRJ}`
													)
											: () => table.setCreatingRow(true)
									}>
									Create New Row
								</Button>
							)}
						<Button
							variant="outlined"
							onClick={() => handlePrint()}>
							Print
						</Button>
						<Button
							variant="outlined"
							onClick={() => exportToCSV()}>
							Export to CSV
						</Button>
					</Box>
				),
		  })
		: useMaterialReactTable({
				columns,
				data,
				createDisplayMode: "modal",
				editDisplayMode: "row",
				getRowId: (row) => row.id,
				onCreatingRowCancel: () => setValidationErrors({}),
				onCreatingRowSave: async ({ values, table }) => {
					// Tambahkan logika simpan
					let newData;
					await tableMemo.createFunction(values).then((res) => {
						newData = res.data.data;
						setData((prevData) => [...prevData, newData]);
					});
					table.setCreatingRow(null);
					if (type === "jurusan") {
						setJurusan((prevData) => [...prevData, newData]);
					}
				},
				onEditingRowCancel: () => setValidationErrors({}),
				onEditingRowSave: async ({ values, table }) => {
					await tableMemo.editFunction(values.id, values).then(() => {
						setData((prevData) =>
							prevData.map((dataElement) =>
								dataElement.id === values.id
									? values
									: dataElement
							)
						);
					});
					if (type === "jurusan") {
						setJurusan((prevData) =>
							prevData.map((dataElement) =>
								dataElement.id === values.id
									? values
									: dataElement
							)
						);
					}
					table.setEditingRow(null);
				},
				renderTopToolbarCustomActions: ({ table }) => (
					<Box sx={{ display: "flex", gap: "1rem" }}>
						{type !== "user" &&
							["admin", "kep_jurusan", "kep_bengkel"].includes(
								role
							) && (
								<Button
									variant="contained"
									onClick={
										["ruangan", "barang"].includes(type)
											? () => navigate(`/form/${type}`)
											: [
													"ruanganBarang",
													"jurusanBarang",
											  ].includes(type)
											? () =>
													navigate(
														`/form/${type}/${idRJ}`
													)
											: () => table.setCreatingRow(true)
									}>
									Create New Row
								</Button>
							)}
						<Button
							variant="outlined"
							onClick={() => handlePrint()}>
							Print
						</Button>
						<Button
							variant="outlined"
							onClick={() => exportToCSV()}>
							Export to CSV
						</Button>
					</Box>
				),
		  });

	const handlePrint = () => {
		const printWindow = window.open("", "", "height=600,width=800");
		printWindow.document.write("<html><head><title>Print</title>");
		printWindow.document.write("</head><body >");
		printWindow.document.write("<h1>Tabel Ruangan</h1>");
		printWindow.document.write('<table border="1">');
		printWindow.document.write("<thead><tr>");
		columns.forEach((col) => {
			printWindow.document.write(`<th>${col.header}</th>`);
		});
		printWindow.document.write("</tr></thead><tbody>");
		data.forEach((row) => {
			printWindow.document.write("<tr>");
			columns.forEach((col) => {
				printWindow.document.write(`<td>${row[col.accessorKey]}</td>`);
			});
			printWindow.document.write("</tr>");
		});
		printWindow.document.write("</tbody></table>");
		printWindow.document.write("</body></html>");
		printWindow.document.close();
		printWindow.focus();
		printWindow.print();
	};

	const exportToCSV = () => {
		const csvRows = [];
		const headers = columns.map((col) => col.header).join(",");
		csvRows.push(headers);

		data.forEach((row) => {
			const values = columns.map((col) => row[col.accessorKey] || "");
			csvRows.push(values.join(","));
		});

		const csvContent = csvRows.join("\n");
		const blob = new Blob([csvContent], {
			type: "text/csv;charset=utf-8;",
		});
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.setAttribute("href", url);
		link.setAttribute("download", "data-ruangan.csv");
		link.click();
	};

	if (type === "barang") {
		return !isLoading ? (
			<MaterialReactTable table={table} />
		) : (
			<div>Loading...</div>
		);
	}
	return <MaterialReactTable table={table} />;
};

export default DataTable;
