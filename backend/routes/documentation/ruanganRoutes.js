const express = require("express");
const router = express.Router();
const ruanganController = require('../../controllers/repository/ruanganRepository');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Ruangan:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the ruangan
 *           example: 1
 *         nama_ruangan:
 *           type: string
 *           description: The name of the ruangan
 *           example: "Ruang A"
 *         luas_ruangan:
 *           type: integer
 *           description: The area of the ruangan in square meters
 *           example: 50
 *         foto_ruangan:
 *           type: string
 *           description: The URL of the photo of the ruangan
 *           example: "http://example.com/photos/ruang_a.jpg"
 *         inventaris_sapras:
 *           type: string
 *           description: The inventory of the ruangan's facilities
 *           example: "Meja, Kursi, Proyektor"
 *   security:
 *     - BearerAuth: []
 */

/**
 * @swagger
 * /api/ruangan:
 *   get:
 *     summary: Retrieve a list of all ruangan
 *     tags: [Ruangan]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of ruangan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nama_ruangan:
 *                     type: string
 *                     example: "Ruang A"
 *                   luas_ruangan:
 *                     type: integer
 *                     example: 50
 *                   foto_ruangan:
 *                     type: string
 *                     example: "http://example.com/photo.jpg"
 *                   inventaris_sapras:
 *                     type: string
 *                     example: "Meja, Kursi, Proyektor"
 *       500:
 *         description: Internal server error
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
router.get('/', ruanganController.getAll);

/**
 * @swagger
 * /api/ruangan/{id}:
 *   get:
 *     summary: Retrieve a ruangan by ID
 *     tags: [Ruangan]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the ruangan to retrieve
 *     responses:
 *       200:
 *         description: A single ruangan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nama_ruangan:
 *                   type: string
 *                   example: "Ruang A"
 *                 luas_ruangan:
 *                   type: integer
 *                   example: 50
 *                 foto_ruangan:
 *                   type: string
 *                   example: "http://example.com/photo.jpg"
 *                 inventaris_sapras:
 *                   type: string
 *                   example: "Meja, Kursi, Proyektor"
 *       404:
 *         description: Ruangan not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ruangan tidak ditemukan"
 *       500:
 *         description: Internal server error
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
router.get('/:id', ruanganController.getById);

/**
 * @swagger
 * /api/ruangan:
 *   post:
 *     summary: Create a new ruangan
 *     tags: [Ruangan]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama_ruangan:
 *                 type: string
 *                 description: The name of the ruangan
 *                 example: "Ruang A"
 *               luas_ruangan:
 *                 type: integer
 *                 description: The area of the ruangan in square meters
 *                 example: 50
 *               foto_ruangan:
 *                 type: string
 *                 format: binary
 *                 description: The photo of the ruangan
 *               inventaris_sapras:
 *                 type: string
 *                 description: The inventory of the ruangan's facilities
 *                 example: "Meja, Kursi, Proyektor"
 *     responses:
 *       201:
 *         description: The created ruangan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ruangan berhasil dibuat"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nama_ruangan:
 *                       type: string
 *                       example: "Ruang A"
 *                     luas_ruangan:
 *                       type: integer
 *                       example: 50
 *                     foto_ruangan:
 *                       type: string
 *                       example: "http://example.com/photo.jpg"
 *                     inventaris_sapras:
 *                       type: string
 *                       example: "Meja, Kursi, Proyektor"
 *       400:
 *         description: All fields are required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Semua field harus diisi"
 *       500:
 *         description: Internal server error
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

router.post('/', ruanganController.create);

/**
 * @swagger
 * /api/ruangan/{id}:
 *   put:
 *     summary: Update an existing ruangan by ID
 *     tags: [Ruangan]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the ruangan to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama_ruangan:
 *                 type: string
 *                 description: The name of the ruangan
 *                 example: "Ruang A"
 *               luas_ruangan:
 *                 type: integer
 *                 description: The area of the ruangan in square meters
 *                 example: 50
 *               foto_ruangan:
 *                 type: string
 *                 format: binary
 *                 description: The photo of the ruangan
 *               inventaris_sapras:
 *                 type: string
 *                 description: The inventory of the ruangan's facilities
 *                 example: "Meja, Kursi, Proyektor"
 *     responses:
 *       200:
 *         description: The updated ruangan data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ruangan berhasil diperbarui"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nama_ruangan:
 *                       type: string
 *                       example: "Ruang A"
 *                     luas_ruangan:
 *                       type: integer
 *                       example: 50
 *                     foto_ruangan:
 *                       type: string
 *                       example: "http://example.com/photo.jpg"
 *                     inventaris_sapras:
 *                       type: string
 *                       example: "Meja, Kursi, Proyektor"
 *       400:
 *         description: No fields to update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tidak ada field yang diperbarui"
 *       404:
 *         description: Ruangan not found or no changes made
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ruangan tidak ditemukan atau tidak ada perubahan"
 *       500:
 *         description: Internal server error
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
router.put('/:id', ruanganController.update);

/**
 * @swagger
 * /api/ruangan/{id}:
 *   delete:
 *     summary: Delete a ruangan by ID
 *     tags: [Ruangan]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the ruangan to delete
 *     responses:
 *       200:
 *         description: Ruangan deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ruangan berhasil dihapus"
 *       404:
 *         description: Ruangan not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ruangan tidak ditemukan"
 *       500:
 *         description: Internal server error
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
router.delete('/:id', ruanganController.delete);

module.exports = router;
