const express = require("express");
const router = express.Router();
const PenempatanLController = require('../../controllers/repository/penempatanLRepository');


router.get('/', PenempatanLController.getAll);

router.get('/:id', PenempatanLController.getById);

router.post('/', PenempatanLController.create);

router.put('/:id', PenempatanLController.update);

router.delete('/:id', PenempatanLController.delete);

module.exports = router;
