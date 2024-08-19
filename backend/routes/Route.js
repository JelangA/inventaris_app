const express = require("express");
const router = express.Router();

//import controller
const UserController = require('../controllers/userController');

// User Controller
router.post("/user", UserController.create);
router.put("/user/:id", UserController.update);
router.patch("/user/:id", UserController.patch);
router.delete("/user/:id", UserController.delete);
router.get("/user", UserController.getAll);
router.get("/user/:id", UserController.getById);



module.exports = router;