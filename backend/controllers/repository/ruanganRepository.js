const Ruangan = require('../../models/ruangan');
const {createItem, updateItem, deleteItem, getById, getAll} = require('../../utils/crudHelper');

const repository = {};


repository.create = (req, res) => createItem(Ruangan, req.body, res);

// Update an existing ruangan
repository.update = (req, res) => updateItem(Ruangan, 'Ruangan', req.params.id, req.body, res);

// Delete a ruangan
repository.delete = (req, res) => deleteItem(Ruangan, 'Ruangan', req.params.id, res);

// Get a ruangan by ID
repository.getById = (req, res) => getById(Ruangan, 'Ruangan', req.params.id, res);

// Get all ruangans
repository.getAll = (req, res) => getAll(Ruangan, res);

module.exports = repository;
