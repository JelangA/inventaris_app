const express = require("express");
const router = express.Router();
const ruanganController = require('../../controllers/repository/ruanganRepository');


router.get('/', ruanganController.getAll);

router.get('/:id', ruanganController.getById);

router.post('/', ruanganController.create);

router.put('/:id', ruanganController.update);

router.delete('/:id', ruanganController.delete);

module.exports = router;
