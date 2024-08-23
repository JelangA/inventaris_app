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

/**
 * @swagger
 * /pengadaan:
 *   post:
 *     summary: Tambah atau kurangi stok barang berdasarkan pengadaan
 *     description: Endpoint ini digunakan untuk menambah atau mengurangi stok barang berdasarkan tipe pengadaan (`barang_masuk` atau `barang_keluar`).
 *     tags:
 *       - Pengadaan
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               no_inventaris:
 *                 type: string
 *                 description: Nomor inventaris barang.
 *                 example: "INV12345"
 *               jumlah:
 *                 type: integer
 *                 description: Jumlah barang yang akan ditambahkan atau dikurangi.
 *                 example: 5
 *               tipe_pengadaan:
 *                 type: string
 *                 description: Tipe pengadaan (`barang_masuk` atau `barang_keluar`).
 *                 example: "barang_masuk"
 *               tanggal:
 *                 type: string
 *                 format: date-time
 *                 description: Tanggal pengadaan.
 *                 example: "2024-08-21T14:30:00Z"
 *     responses:
 *       '201':
 *         description: Pengadaan berhasil dilakukan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pengadaan berhasil dilakukan"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     no_inventaris:
 *                       type: string
 *                       example: "INV12345"
 *                     stok_asal:
 *                       type: integer
 *                       example: 10
 *                     jumlah:
 *                       type: integer
 *                       example: 5
 *                     tipe_pengadaan:
 *                       type: string
 *                       example: "barang_masuk"
 *                     tanggal:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-21T14:30:00Z"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-21T15:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-21T15:00:00Z"
 *       '400':
 *         description: Permintaan tidak valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Permintaan tidak valid"
 *       '500':
 *         description: Terjadi kesalahan pada server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Terjadi kesalahan pada server"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post("/", pengadaanController.pengadaanBarang);

module.exports = router;
