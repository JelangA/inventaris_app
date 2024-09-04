const express = require("express");
const router = express.Router();
const penempatanRController = require('../../controllers/repository/penempatanRRepository');

router.post("/", penempatanRController.create);

router.get("/", penempatanRController.getAll);

router.get("/:id", penempatanRController.getById);

router.put("/:id", penempatanRController.update);

router.delete("/:id", penempatanRController.delete);

module.exports = router;

