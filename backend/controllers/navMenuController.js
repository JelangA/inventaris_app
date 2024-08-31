const Ruangan = require('../models/ruangan');
const Jurusan = require('../models/jurusan');
const Lemari = require('../models/lemari');
const { response, responseErr } = require('../utils/responseHelpers');

controller = {};

controller.getNavitem = async (req, res) => {
    try {
        const ruangan = await Ruangan.findAll();
        const jurusan = await Jurusan.findAll();
        const lemari = await Lemari.findAll();

        const listRuangan = ruangan.map(item => ({
            nama: item.nama_ruangan,
        }));

        const jurusanLemariMap = jurusan.map(j => ({
            nama_jurusan: j.jurusan,
            lemari: lemari
                .filter(l => l.id_jurusan === j.id)
                .map(l => l.no_lemari),
        }));

        const data = {
            ruangan: listRuangan,
            jurusan: jurusanLemariMap,
        };

        console.log(data);
        return response(res, data);
    } catch (error) {
        console.log(error);
        return responseErr(res, error.message, 500);
    }
};

module.exports = controller;
