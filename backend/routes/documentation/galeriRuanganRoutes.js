const express = require("express");
const router = express.Router();
const galeriRuanganController = require('../../controllers/repository/galeriRepository');

router.post("/", galeriRuanganController.create);

router.get("/", galeriRuanganController.getAll);

router.get("/:id", galeriRuanganController.getById);

router.put("/:id", galeriRuanganController.update);

router.delete("/:id", galeriRuanganController.delete);

module.exports = router;