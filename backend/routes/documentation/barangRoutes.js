const express = require("express");
const router = express.Router();
const BarangController = require('../../controllers/repository/barangRepository');

router.post("/", BarangController.create);

router.put("/:id", BarangController.update);

router.delete("/:id", BarangController.delete);

router.get("/:id", BarangController.getById);

router.get("/", BarangController.getAll);

module.exports = router;
