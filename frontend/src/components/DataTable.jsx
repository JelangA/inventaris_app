import React, { useMemo, useState } from 'react';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DataTable = ({ data }) => {
    const [validationErrors, setValidationErrors] = useState({});

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                enableEditing: false,
                size: 80,
            },
            {
                accessorKey: 'name',
                header: 'Nama Ruangan',
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
            // Tambahkan kolom lain sesuai kebutuhan
        ],
        [validationErrors],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
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
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => {
                        if (window.confirm('Are you sure you want to delete this row?')) {
                            // Tambahkan logika hapus
                        }
                    }}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
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
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write('<h1>Tabel Ruangan</h1>');
        printWindow.document.write('<table border="1">');
        printWindow.document.write('<thead><tr>');
        columns.forEach(col => {
            printWindow.document.write(`<th>${col.header}</th>`);
        });
        printWindow.document.write('</tr></thead><tbody>');
        data.forEach(row => {
            printWindow.document.write('<tr>');
            columns.forEach(col => {
                printWindow.document.write(`<td>${row[col.accessorKey]}</td>`);
            });
            printWindow.document.write('</tr>');
        });
        printWindow.document.write('</tbody></table>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    const exportToCSV = () => {
        const csvRows = [];
        const headers = columns.map(col => col.header).join(',');
        csvRows.push(headers);

        data.forEach(row => {
            const values = columns.map(col => row[col.accessorKey] || '');
            csvRows.push(values.join(','));
        });

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'data-ruangan.csv');
        link.click();
    };

    return <MaterialReactTable table={table} />;
};

export default DataTable;
