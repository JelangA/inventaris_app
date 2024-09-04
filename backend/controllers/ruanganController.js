const Ruangan = require('../models/ruangan');
const GaleriRuangan = require('../models/galeri_ruangan');
const Penempatan = require('../models/penempatan_ruangan');
const Barang = require('../models/barang');
const { responseErr, response } = require('../utils/responseHelpers');

const controller = {};

controller.getDataRuangan = async (req, res) => {
    try {
        // Ambil semua ruangan
        const ruangans = await Ruangan.findAll();

        // Ambil semua penempatan ruangan
        const penempatan = await Penempatan.findAll();

        // Ambil semua barang
        const barangs = await Barang.findAll();

        // Ambil galeri ruangan berdasarkan id_ruangan
        const galeriByRuanganId = {};
        const galeri = await GaleriRuangan.findAll();
        galeri.forEach(item => {
            if (!galeriByRuanganId[item.id_ruangan]) {
                galeriByRuanganId[item.id_ruangan] = [];
            }
            galeriByRuanganId[item.id_ruangan].push(item);
        });

        // Mengelompokkan penempatan berdasarkan id_ruangan
        const penempatanByRuanganId = {};
        penempatan.forEach(item => {
            if (!penempatanByRuanganId[item.id_ruangan]) {
                penempatanByRuanganId[item.id_ruangan] = [];
            }
            penempatanByRuanganId[item.id_ruangan].push(item);
        });

        // Mengelompokkan barang berdasarkan id_barang
        const barangById = {};
        barangs.forEach(item => {
            barangById[item.id] = item;
        });

        // Gabungkan data ruangan dengan galeri dan barang
        const result = ruangans.map(ruangan => {
            // Dapatkan penempatan untuk ruangan ini
            const penempatanForRuangan = penempatanByRuanganId[ruangan.id] || [];

            // Untuk setiap penempatan, ambil detail barang
            const barangDetails = penempatanForRuangan.map(penempatan => ({
                ...barangById[penempatan.id_barang].toJSON(),
                jumlah: penempatan.jumlah
            }));

            return {
                ...ruangan.toJSON(),
                galeri: galeriByRuanganId[ruangan.id] || [],
                barang: barangDetails
            };
        });

        response(res, result);
    } catch (error) {
        responseErr(res, error.message, 500);
    }
};

module.exports = controller;
