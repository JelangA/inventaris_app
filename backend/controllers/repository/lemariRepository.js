const Lemari = require('../../models/lemari');
const { createItem, updateItem, deleteItem, getById, getAll } = require('../../utils/crudHelper');

const repository = {};

// Create a new lemari
repository.create = (req, res) => createItem(Lemari, req.body, res);

// Update an existing lemari
repository.update = (req, res) => updateItem(Lemari, 'Lemari', req.params.id, req.body, res);

// Delete a lemari
repository.delete = (req, res) => deleteItem(Lemari, 'Lemari', req.params.id, res);

// Get a lemari by ID
repository.getById = (req, res) => getById(Lemari, 'Lemari', req.params.id, res);

// Get all lemaris
repository.getAll = (req, res) => getAll(Lemari, res);

module.exports = repository;