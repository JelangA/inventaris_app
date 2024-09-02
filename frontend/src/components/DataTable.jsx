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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	addDataJurusan,
	editDataJurusan,
	deleteDataJurusan,
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
import axiosClient from "../api/axiosClient.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useNavigate } from "react-router-dom";

const DataTable = ({ data, setData, type, role }) => {
	const [validationErrors, setValidationErrors] = useState({});
	const { jurusan, setJurusan } = useStateContext();
	const navigate = useNavigate();

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
			accessorKey: "foto_barang",
			header: "Foto",
			enableEditing: true,
			Cell: ({ cell }) => <img src={cell.getValue()} alt="Foto" style={{ width: '50px', height: '50px' }} />,
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
		{
			accessorKey: "id_jurusan",
			header: "ID Jurusan",
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
		},
	];

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
			case "barang":
				tableType.columns = barangColumns;
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
				tableType.columns = lemariColumns;
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
	}, [type, validationErrors]);

	const columns = tableMemo.columns;

	const table = useMaterialReactTable({
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
			await tableMemo.createFunction(values).then((res) => {
				console.log(res);
				newData = res.data.data;
				setData((prevData) => [...prevData, newData]);
			});
			table.setCreatingRow(null);
			if (type === "jurusan") {
				window.location.reload();
			}
		},
		onEditingRowCancel: () => setValidationErrors({}),
		onEditingRowSave: async ({ values, table }) => {
			// Tambahkan logika simpan
			await tableMemo.editFunction(values.id, values).then(() => {
				setData((prevData) =>
					prevData.map((dataElement) =>
						dataElement.id === values.id ? values : dataElement
					)
				);
			});
			if (type === "jurusan") {
				window.location.reload();
			}
			table.setEditingRow(null);
		},
		renderRowActions: ({ row, table }) => (
			<Box sx={{ display: "flex", gap: "1rem" }}>
				<Tooltip title="Edit">
					<IconButton onClick={['ruangan', 'barang'].includes(type) ? () => navigate(`/form/${type}/${row.id}`) : () => table.setCreatingRow(row)}>
						<EditIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Delete">
					<IconButton
						color="error"
						onClick={async () => {
							if (
								window.confirm(
									"Are you sure you want to delete this row?"
								)
							) {
								await tableMemo
									.deleteFunction(row.id)
									.then(() => {
										setData((prevData) =>
											prevData.filter(
												(r) => r.id !== row.id
											)
										);
									});
								if (type === "jurusan" || type === "ruangan") {
									window.location.reload();
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
				<Button
					variant="contained"
					onClick={['ruangan', 'barang'].includes(type) ? () => navigate(`/form/${type}`) : () => table.setCreatingRow(true)}>
					Create New Row
				</Button>
				<Button variant="outlined" onClick={() => handlePrint()}>
					Print
				</Button>
				<Button variant="outlined" onClick={() => exportToCSV()}>
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

	return <MaterialReactTable table={table} />;
};

export default DataTable;