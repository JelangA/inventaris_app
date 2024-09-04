const express = require("express");
const router = express.Router();
const jurusanController = require('../../controllers/repository/jurusanRepository');

router.post('/', jurusanController.create);

router.get('/', jurusanController.getAll);

router.get('/:id', jurusanController.getById);

router.put('/:id', jurusanController.update);

router.delete('/:id', jurusanController.delete);

module.exports = router;
