const Jurusan = require("../../models/jurusan");
const { createItem, updateItem, deleteItem, getById, getAll } = require("../../utils/crudHelper");

const repository = {};

// Create a new jurusan
repository.create = (req, res) => createItem(Jurusan, req.body, res);

// Update an existing jurusan
repository.update = (req, res) => updateItem(Jurusan, 'Jurusan', req.params.id, req.body, res);

// Delete a jurusan
repository.delete = (req, res) => deleteItem(Jurusan, 'Jurusan', req.params.id, res);

// Get a jurusan by ID
repository.getById = (req, res) => getById(Jurusan, 'Jurusan', req.params.id, res);

// Get all jurusans
repository.getAll = (req, res) => getAll(Jurusan, res);


module.exports = repository;