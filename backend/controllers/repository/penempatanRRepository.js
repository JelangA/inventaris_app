const penemparanRuangan = require('../../models/penempatan_ruangan');
const {createItem, updateItem, deleteItem, getById, getAll} = require('../../utils/crudHelper');

const repository = {};

// Create a new penemparanRuangan
repository.create = (req, res) => createItem(penemparanRuangan, req.body, res);

// Update an existing penemparanRuangan
repository.update = (req, res) => updateItem(penemparanRuangan, 'Penempatan Ruangan', req.params.id, req.body, res);

// Delete a penemparanRuangan
repository.delete = (req, res) => deleteItem(penemparanRuangan, 'Penempatan Ruangan', req.params.id, res);

// Get a penemparanRuangan by ID
repository.getById = (req, res) => getById(penemparanRuangan, 'Penempatan Ruangan', req.params.id, res);

// Get all penemparanRuangan
repository.getAll = (req, res) => getAll(penemparanRuangan, res);

module.exports = repository;