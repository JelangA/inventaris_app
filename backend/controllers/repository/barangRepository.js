const Barang = require("../../models/barang");
const PenempatanRuangan = require("../../models/penempatan_ruangan");
const PenempatanLemari = require("../../models/penempatan_lemari");
const {createItem, updateItem, deleteItem, getById, getAll} = require("../../utils/crudHelper");

const repository = {};

// Create a new barang
repository.create = (req, res) => createItem(Barang, req.body, res);

// Update an existing barang
repository.update = (req, res) => updateItem(Barang, 'Barang', req.params.id, req.body, res);

// Delete a barang
repository.delete = (req, res) => {
    Barang.destroy({ where: { id: req.params.id } })
}

// Get a barang by ID
repository.getById = (req, res) => getById(Barang, 'Barang', req.params.id, res);

// Get all barang
repository.getAll = (req, res) => getAll(Barang, res);

module.exports = repository;
