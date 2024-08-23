const Jurusan = require("../../models/jurusan");
const { createItem, updateItem, deleteItem, getById, getAll } = require("../../utils/crudHelper");
const {response} = require("express");
const controller = {};

// Create a new jurusan
controller.create = (req, res) =>
{
    console.log('Request body in controller:', req.body);
    createItem(Jurusan, req.body, res);
}

// Update an existing jurusan
controller.update = (req, res) => updateItem(Jurusan, 'Jurusan', req.params.id, req.body, res);

// Delete a jurusan
controller.delete = (req, res) => deleteItem(Jurusan, 'Jurusan', req.params.id, res);

// Get a jurusan by ID
controller.getById = (req, res) => getById(Jurusan, 'Jurusan', req.params.id, res);

// Get all jurusans
controller.getAll = (req, res) => getAll(Jurusan, res);


module.exports = controller;