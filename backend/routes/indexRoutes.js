const express = require("express");
const router = express.Router();
const middleware = require("../middleware/authMiddleware");
const navMenuController = require("../controllers/navMenuController");
// public routes
router.use(require("./documentation/authRoutes"));
router.get("/navitem", navMenuController.getNavitem);

router.use(middleware.verifyToken);
// protected routes
router.use("/pengadaan", require("./documentation/pengadaanRoutes"));
router.use("/barang", require("./documentation/barangRoutes"));
router.use("/ruangan", require("./documentation/ruanganRoutes"));
router.use("/jurusan", require("./documentation/jurusanRoutes"));
router.use("/user", require("./documentation/userRoutes"));
router.use("/lemari", require("./documentation/lemariRoutes"));

router.post("/upload", )

module.exports = router;