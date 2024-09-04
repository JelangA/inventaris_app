const express = require("express");
const router = express.Router();
const lemariController = require('../../controllers/repository/lemariRepository');


router.post("/", lemariController.create);

router.get("/", lemariController.getAll);

router.get("/:id", lemariController.getById);

router.put("/:id", lemariController.update);

router.delete("/:id", lemariController.delete);

module.exports = router;

