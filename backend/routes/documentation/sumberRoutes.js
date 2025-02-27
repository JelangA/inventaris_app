const express = require("express");
const router = express.Router();
const sumberController = require('../../controllers/repository/sumberRepository');


router.get('/', sumberController.getAll);

router.get('/:id', sumberController.getById);

router.post('/', sumberController.create);

router.put('/:id', sumberController.update);

router.delete('/:id', sumberController.delete);

module.exports = router;
