const penempatanLemari = require('../../models/penempatan_lemari');
const { createItem, updateItem, deleteItem, getById, getAll } = require('../../utils/crudHelper');

const repository = {};

// Create a new penempatan_lemari
repository.create = (req, res) => createItem(penempatanLemari, req.body, res);

// Update an existing penempatan_lemari
repository.update = (req, res) => updateItem(penempatanLemari, 'Penempatan Lemari', req.params.id, req.body, res);

// Delete a penempatan_lemari
repository.delete = (req, res) => deleteItem(penempatanLemari, 'Penempatan Lemari', req.params.id, res);

// Get a penempatan_lemari by ID
repository.getById = (req, res) => getById(penempatanLemari, 'Penempatan Lemari', req.params.id, res);

// Get all penempatan_lemaris
repository.getAll = (req, res) => getAll(penempatanLemari, res);

module.exports = repository;
