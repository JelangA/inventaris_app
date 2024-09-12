const express = require("express");
const router = express.Router();
const pengadaanController = require('../../controllers/pengadaanController');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     LogPengadaan:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the log_pengadaan
 *           example: 1
 *         no_inventaris:
 *           type: integer
 *           description: The inventory number of the barang associated with the log_pengadaan
 *           example: 12345
 *         stok_asal:
 *           type: integer
 *           description: The initial stock level before the pengadaan
 *           example: 10
 *         jumlah:
 *           type: integer
 *           description: The quantity of barang involved in the pengadaan
 *           example: 5
 *         tipe_pengadaan:
 *           type: string
 *           description: The type of pengadaan (e.g., barang_masuk, barang_keluar)
 *           example: barang_masuk
 *         tanggal:
 *           type: string
 *           format: date-time
 *           description: The date when the pengadaan occurred
 *           example: "2024-08-23T14:30:00Z"
 *       required:
 *         - no_inventaris
 *         - stok_asal
 *         - jumlah
 *         - tipe_pengadaan
 *         - tanggal
 *   security:
 *     - BearerAuth: []
 */

router.post("/", pengadaanController.pengadaanBarang);

router.get("/", pengadaanController.getALlPengadaan);

module.exports = router;
