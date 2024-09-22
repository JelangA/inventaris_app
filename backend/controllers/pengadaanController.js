const { createItem } = require('../utils/crudHelper');
const Barang = require('../models/barang');
const respon = require('../utils/responseHelpers');
const LogPengadaan = require('../models/logPengadaan');

const controller = {};


controller.pengadaanBarang = async (req, res) => {
    let barang;
    try{
        barang = await Barang.findOne({ where: { no_inventaris: req.body.no_inventaris } });
        if (!barang) {
            return respon.responseErr(res, 'Barang tidak ditemukan', 404);
        }
    }catch (error) {
        return respon.responseErr(res, error.message , 500);
    }
    console.log(barang.jml_layak_pakai);
    try {

        // Buat log pengadaan dan simpan stok_asal sebelum menyimpannya ke database
        const logPengadaan = await LogPengadaan.create({
            ...req.body,
            stok_asal: barang.jml_layak_pakai, // Menetapkan stok_asal dari barang yang ditemukan
        });

        // Logging untuk membantu debugging
        console.log(`Tipe pengadaan: ${req.body.tipe_pengadaan}, Jumlah: ${req.body.jumlah}, Stok saat ini: ${barang.jml_layak_pakai}`);

        // Mengecek tipe pengadaan dan melakukan penyesuaian stok barang
        if (req.body.tipe_pengadaan === 'barang_masuk') {
            barang.jml_layak_pakai += req.body.jumlah;
            console.log(`Barang masuk: stok setelah update = ${barang.jml_layak_pakai}`);
        } else if (req.body.tipe_pengadaan === 'barang_keluar') {
            if (barang.jml_layak_pakai < req.body.jumlah) {
                return respon.responseErr(res, 'Stok Barang Tidak Cukup', 400);
            }
            barang.jml_layak_pakai -= req.body.jumlah;
            console.log(`Barang keluar: stok setelah update = ${barang.jml_layak_pakai}`);
        } else {
            // Jika tipe pengadaan tidak valid
            return respon.responseErr(res, 'Tipe pengadaan tidak valid', 400);
        }



        // Menyimpan perubahan stok barang dan log pengadaan
        await barang.save();
        await logPengadaan.save();

        // Mengirimkan respons sukses dengan data log pengadaan yang diperbarui
        console.log(await Barang.findOne({ where: { no_inventaris: req.body.no_inventaris } }));
        return respon.response(res, logPengadaan, 201);
    } catch (error) {

        // Logging error untuk debugging
        console.error(`Error: ${error.message}`);

        // Mengirimkan respons error jika terjadi kesalahan
        return respon.responseErr(res, error.message, 500);
    }
};


controller.getALlPengadaan = async (req, res) => {
    try {
        const logPengadaan = await LogPengadaan.findAll();
        return respon.response(res, logPengadaan);
    } catch (error) {
        return respon.responseErr(res, error.message, 500);
    }
}

module.exports = controller;