const express = require("express");
const router = express.Router();
const middleware = require("../middleware/authMiddleware");

// public routes
router.use(require("./documentation/authRoutes"));
router.use(middleware.verifyToken);
// protected routes
router.use("/pengadaan", require("./documentation/pengadaanRoutes"));
router.use("/barang", require("./documentation/barangRoutes"));
router.use("/ruangan", require("./documentation/ruanganRoutes"));
router.use("/jurusan", require("./documentation/jurusanRoutes"));
router.use("/user", require("./documentation/userRoutes"));

router.post("/upload", )

module.exports = router;