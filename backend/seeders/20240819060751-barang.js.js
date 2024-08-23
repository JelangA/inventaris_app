'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('barang', [
            {
                no_inventaris: "Brg001",
                lokasi: "ruang D1",
                jenis_sarana: 'Elektronik',
                nama_barang: 'Laptop',
                spesifikasi: 'Intel i5, RAM 8GB, SSD 256GB',
                satuan: 'qty',
                jml_layak_pakai: 8,
                jml_tidak_layak_pakai: 2,
                sumber: 'Pengadaan Pemerintah',
                pengadaan: new Date('2023-01-01'), // Gunakan format DATE atau YEAR sesuai kebutuhan
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                no_inventaris: "Brg002",
                lokasi: "ruang D2",
                jenis_sarana: 'Elektronik',
                nama_barang: 'Proyektor',
                spesifikasi: 'Full HD, 3000 lumens',
                satuan: 'qty',
                jml_layak_pakai: 2,
                jml_tidak_layak_pakai: 0,
                sumber: 'Pengadaan Pemerintah',
                pengadaan: new Date('2023-01-01'), // Gunakan format DATE atau YEAR sesuai kebutuhan
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                no_inventaris: "Brg003",
                lokasi: "ruang D3",
                jenis_sarana: 'Elektronik',
                nama_barang: 'Printer',
                spesifikasi: 'Laserjet, A3',
                satuan: 'qty',
                jml_layak_pakai: 1,
                jml_tidak_layak_pakai: 0,
                sumber: 'Pengadaan Pemerintah',
                pengadaan: new Date('2023-01-01'), // Gunakan format DATE atau YEAR sesuai kebutuhan
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                no_inventaris: "Brg004",
                lokasi: "ruang D4",
                jenis_sarana: 'Elektronik',
                nama_barang: 'Kamera',
                spesifikasi: 'DSLR, 24MP',
                satuan: 'qty',
                jml_layak_pakai: 1,
                jml_tidak_layak_pakai: 0,
                sumber: 'Pengadaan Pemerintah',
                pengadaan: new Date('2023-01-01'), // Gunakan format DATE atau YEAR sesuai kebutuhan
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                no_inventaris: "Brg005",
                lokasi: "ruang D5",
                jenis_sarana: 'Elektronik',
                nama_barang: 'Smartboard',
                spesifikasi: 'Touchscreen, 65 inch',
                satuan: 'qty',
                jml_layak_pakai: 1,
                jml_tidak_layak_pakai: 0,
                sumber: 'Pengadaan Pemerintah',
                pengadaan: new Date('2023-01-01'), // Gunakan format DATE atau YEAR sesuai kebutuhan
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('barang', null, {});
    }
};
