const { createItem } = require('../utils/crudHelper');
const Barang = require('../models/barang');
const respon = require('../utils/responseHelpers');
const LogPengadaan = require('../models/logPengadaan');

const controller = {};


controller.pengadaanBarang = async (req, res) => {
    try {
        // Buat log pengadaan dan simpan ke database
        const logPengadaan = await LogPengadaan.create(req.body);

        // Mencari barang berdasarkan ID
        const barang = await Barang.findOne({ where: { id: req.body.barangId } });
        if (!barang) {
            return respon.responseErr(res, 'Barang tidak ditemukan', 404);
        }

        // Update stok_asal dengan stok barang saat ini
        logPengadaan.stok_asal = barang.stok;

        // Logging untuk membantu debugging
        console.log(`Tipe pengadaan: ${req.body.tipe_pengadaan}, Jumlah: ${req.body.jumlah}, Stok saat ini: ${barang.stok}`);

        // Mengecek tipe pengadaan dan melakukan penyesuaian stok barang
        if (req.body.tipe_pengadaan === 'barang_masuk') {
            barang.stok += req.body.jumlah;
            console.log(`Barang masuk: stok setelah update = ${barang.stok}`);
        } else if (req.body.tipe_pengadaan === 'barang_keluar') {
            if (barang.stok < req.body.jumlah) {
                return respon.responseErr(res, 'Stok Barang Tidak Cukup', 400);
            }
            barang.stok -= req.body.jumlah;
            console.log(`Barang keluar: stok setelah update = ${barang.stok}`);
        } else {
            // Jika tipe pengadaan tidak valid
            return respon.responseErr(res, 'Tipe pengadaan tidak valid', 400);
        }

        // Menyimpan perubahan stok barang dan log pengadaan
        await barang.save();
        await logPengadaan.save();

        // Mengirimkan respons sukses dengan data log pengadaan yang diperbarui
        return respon.response(res, logPengadaan, 201);
    } catch (error) {
        // Logging error untuk debugging
        console.error(`Error: ${error.message}`);

        // Mengirimkan respons error jika terjadi kesalahan
        return respon.responseErr(res, error.message, 500);
    }
}


controller.getALlPengadaan = async (req, res) => {
    try {
        const logPengadaan = await LogPengadaan.findAll();
        return respon.response(res, logPengadaan);
    } catch (error) {
        return respon.responseErr(res, error.message, 500);
    }
}

module.exports = controller;