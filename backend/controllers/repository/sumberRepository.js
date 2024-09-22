const Sumber = require('../../models/sumber');
const {createItem, updateItem, deleteItem, getById, getAll} = require('../../utils/crudHelper');

const repository = {};


repository.create = (req, res) => createItem(Sumber, req.body, res);

// Update an existing ruangan
repository.update = (req, res) => updateItem(Sumber, 'Sumber', req.params.id, req.body, res);

// Delete a ruangan
repository.delete = (req, res) => deleteItem(Sumber, 'Sumber', req.params.id, res);

// Get a ruangan by ID
repository.getById = (req, res) => getById(Sumber, 'Sumber', req.params.id, res);

// Get all ruangans
repository.getAll = (req, res) => getAll(Sumber, res);

module.exports = repository;
