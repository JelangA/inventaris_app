const express = require("express");
const router = express.Router();
const jurusanController = require('../../controllers/repository/jurusanRepository');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Jurusan:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the jurusan
 *           example: 1
 *         jurusan:
 *           type: string
 *           description: The name of the jurusan
 *           example: Computer Science
 *       required:
 *         - jurusan
 *   security:
 *     - BearerAuth: []
 */

/**
 * @swagger
 * /api/jurusan:
 *   post:
 *     summary: Membuat data jurusan baru
 *     tags: [Jurusan]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jurusan
 *             properties:
 *               jurusan:
 *                 type: string
 *                 description: Nama jurusan
 *                 example: "Teknik Informatika"
 *     responses:
 *       201:
 *         description: Jurusan berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Jurusan berhasil dibuat"
 *       400:
 *         description: Permintaan tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Permintaan tidak valid"
 *       500:
 *         description: Kesalahan server internal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Kesalahan server internal"
 */
router.post('/', jurusanController.create);

/**
 * @swagger
 * /api/jurusan:
 *   get:
 *     summary: Mendapatkan daftar semua jurusan
 *     tags: [Jurusan]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar jurusan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Daftar jurusan berhasil diambil"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID jurusan
 *                         example: 1
 *                       jurusan:
 *                         type: string
 *                         description: Nama jurusan
 *                         example: "Teknik Informatika"
 *       500:
 *         description: Kesalahan server internal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Kesalahan server internal"
 */
router.get('/', jurusanController.getAll);

/**
 * @swagger
 * /api/jurusan/{id}:
 *   get:
 *     summary: Mendapatkan jurusan berdasarkan ID
 *     tags: [Jurusan]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID jurusan yang ingin diambil
 *     responses:
 *       200:
 *         description: Data jurusan berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Data jurusan berhasil diambil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID jurusan
 *                       example: 1
 *                     jurusan:
 *                       type: string
 *                       description: Nama jurusan
 *                       example: "Teknik Informatika"
 *       404:
 *         description: Jurusan tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Jurusan tidak ditemukan"
 *       500:
 *         description: Kesalahan server internal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Kesalahan server internal"
 */
router.get('/:id', jurusanController.getById);

/**
 * @swagger
 * /api/jurusan/{id}:
 *   put:
 *     summary: Memperbarui data jurusan berdasarkan ID
 *     tags: [Jurusan]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID jurusan yang ingin diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jurusan:
 *                 type: string
 *                 description: Nama jurusan
 *                 example: "Teknik Mesin"
 *     responses:
 *       200:
 *         description: Data jurusan berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Data jurusan berhasil diperbarui"
 *       400:
 *         description: Permintaan tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Permintaan tidak valid"
 *       404:
 *         description: Jurusan tidak ditemukan atau tidak ada perubahan yang dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Jurusan tidak ditemukan atau tidak ada perubahan yang dibuat"
 *       500:
 *         description: Kesalahan server internal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Kesalahan server internal"
 */
router.put('/:id', jurusanController.update);

/**
 * @swagger
 * /api/jurusan/{id}:
 *   delete:
 *     summary: Menghapus jurusan berdasarkan ID
 *     tags: [Jurusan]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID jurusan yang ingin dihapus
 *     responses:
 *       200:
 *         description: Jurusan berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Jurusan berhasil dihapus"
 *       404:
 *         description: Jurusan tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Jurusan tidak ditemukan"
 *       500:
 *         description: Kesalahan server internal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Kesalahan server internal"
 */
router.delete('/:id', jurusanController.delete);

module.exports = router;
