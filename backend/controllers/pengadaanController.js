const { createItem } = require('../utils/crudHelper');
const Barang = require('../models/barang');
const respon = require('../utils/responseHelpers');
const LogPengadaan = require('../models/logPengadaan');

const controller = {};

controller.pengadaanBarang = async (req, res) => {
    try {
        // Null-kan stok_asal sebelum data pengadaan diinputkan
        req.body.stok_asal = null;

        // Buat log pengadaan dan simpan ke database
        const logPengadaan = await createItem(LogPengadaan, req.body, res);

        // Mencari barang berdasarkan ID
        const barang = await Barang.findOne({ where: { id: req.body.barangId } });
        if (!barang) {
            return respon.responseErr(res, 'Barang not found', 404);
        }

        // Update stok_asal dengan stok barang saat ini
        logPengadaan.stok_asal = barang.stok;

        // Mengecek tipe pengadaan dan melakukan penyesuaian stok barang
        if (req.body.tipe_pengadaan === 'barang_masuk') {
            barang.stok += req.body.jumlah;
        } else if (req.body.tipe_pengadaan === 'barang_keluar') {
            if (barang.stok < req.body.jumlah) {
                return respon.responseErr(res, 'Stok Barang Tidak Cukup', 400);
            }
            barang.stok -= req.body.jumlah;
        }

        // Menyimpan perubahan stok barang dan stok_asal
        await barang.save();
        await logPengadaan.save();

        // Mengirimkan respons sukses dengan data log pengadaan yang diperbarui
        return respon.response(res, logPengadaan, 201);
    } catch (error) {
        // Mengirimkan respons error jika terjadi kesalahan
        return respon.responseErr(res, error.message, 500);
    }
}

module.exports = controller;