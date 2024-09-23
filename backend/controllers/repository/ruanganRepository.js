const Ruangan = require('../../models/ruangan');
const {createItem, updateItem, deleteItem, getById, getAll} = require('../../utils/crudHelper');

const repository = {};


repository.create = async (req, res)  => {
    const payload = {
        nama_ruangan : req.body.nama_ruangan,
        luas_ruangan: req.body.luas_ruangan,
        inventaris_sapras: req.body.inventaris_sapras,
        id_jurusan: req.body.id_jurusan === '' || req.body.id_jurusan === 'Tidak ada jurusan' ? null : req.body.id_jurusan,
    }

    await createItem(Ruangan, payload, res)
};

// Update an existing ruangan
repository.update = (req, res) => updateItem(Ruangan, 'Ruangan', req.params.id, req.body, res);

// Delete a ruangan
repository.delete = (req, res) => deleteItem(Ruangan, 'Ruangan', req.params.id, res);

// Get a ruangan by ID
repository.getById = (req, res) => getById(Ruangan, 'Ruangan', req.params.id, res);

// Get all ruangans
repository.getAll = (req, res) => getAll(Ruangan, res);

module.exports = repository;
