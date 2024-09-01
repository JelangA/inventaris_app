import React, { useMemo, useState } from "react";
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
	Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DataTable = ({ data, type }) => {
	const [validationErrors, setValidationErrors] = useState({});

    let tableColumns = [];

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
			accessorKey: "jenis_sarana",
			header: "Jenis",
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
			accessorKey: "nama_barang",
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
			accessorKey: "foto_barang",
			header: "Foto",
			enableEditing: false,
		},
		{
			accessorKey: "spesifikasi",
			header: "Spesifikasi",
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
			accessorKey: "satuan",
			header: "Satuan",
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
			accessorKey: "jml_layak_pakai",
			header: "Jumlah Layak Pakai",
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
			accessorKey: "jml_tidak_layak_pakai",
			header: "Jumlah Tidak Layak Pakai",
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
			accessorKey: "sumber",
			header: "Sumber",
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
			accessorKey: "pengadaan",
			header: "Pengadaan",
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
			accessorKey: "luas_ruangan",
			header: "Luas Ruangn",
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
			accessorKey: "foto_barang",
			header: "Foto",
			enableEditing: false,
		},
		{
			accessorKey: "inventaris_sapras",
			header: "Inventaris Sapras",
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
	];

    const lemariColumns = [
        {
            accessorKey: 'id',
            header: 'ID',
            enableEditing: false,
            size: 80
        },
        {
            accessorKey: 'no_lemari',
            header: 'No Lemari',
            enableEditing: true,
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
            accessorKey: 'id_jurusan',
            header: 'ID Jurusan',
            enableEditing: false,
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
    ]

    const userColumns = [
        {
            accessorKey: 'id',
            header: 'ID',
            enableEditing: false,
            size: 80
        },
        {
            accessorKey: 'name',
            header: 'Nama',
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
            accessorKey: 'username',
            header: 'Username',
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
            accessorKey: 'password',
            header: 'Password',
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
            accessorKey: 'tipe_user',
            header: 'Tipe User',
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
            accessorKey: 'no_hp',
            header: 'No HP',
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
    ]

	switch (type) {
		case "barang":
			tableColumns = barangColumns;
			break;
		case "ruangan":
			tableColumns = ruanganColumns;
			break;
		case "lemari":
			tableColumns = lemariColumns;
			break;
		case "user":
			tableColumns = userColumns;
			break;
	}

	const columns = useMemo(() => tableColumns, [validationErrors]);

	const table = useMaterialReactTable({
		columns,
		data,
		createDisplayMode: "modal",
		editDisplayMode: "modal",
		enableEditing: true,
		getRowId: (row) => row.id,
		onCreatingRowCancel: () => setValidationErrors({}),
		onCreatingRowSave: async ({ values, table }) => {
			// Tambahkan logika simpan
		},
		onEditingRowCancel: () => setValidationErrors({}),
		onEditingRowSave: async ({ values, table }) => {
			// Tambahkan logika simpan
		},
		renderRowActions: ({ row, table }) => (
			<Box sx={{ display: "flex", gap: "1rem" }}>
				<Tooltip title="Edit">
					<IconButton onClick={() => table.setEditingRow(row)}>
						<EditIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Delete">
					<IconButton
						color="error"
						onClick={() => {
							if (
								window.confirm(
									"Are you sure you want to delete this row?"
								)
							) {
								// Tambahkan logika hapus
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
					onClick={() => table.setCreatingRow(true)}>
					Create New Ruangan
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
