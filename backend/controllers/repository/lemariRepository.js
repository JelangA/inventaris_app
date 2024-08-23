const Lemari = require('../../models/lemari');
const { createItem, updateItem, deleteItem, getById, getAll } = require('../../utils/crudHelper');

const controller = {};

// Create a new lemari
controller.create = (req, res) => createItem(Lemari, req.body, res);

// Update an existing lemari
controller.update = (req, res) => updateItem(Lemari, 'Lemari', req.params.id, req.body, res);

// Delete a lemari
controller.delete = (req, res) => deleteItem(Lemari, 'Lemari', req.params.id, res);

// Get a lemari by ID
controller.getById = (req, res) => getById(Lemari, 'Lemari', req.params.id, res);

// Get all lemaris
controller.getAll = (req, res) => getAll(Lemari, res);

module.exports = controller;