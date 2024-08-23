const express = require("express");
const router = express.Router();
const lemariController = require('../../controllers/repository/lemariRepository');


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Lemari:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the lemari
 *           example: 1
 *         no_lemari:
 *           type: integer
 *           description: The number of the lemari
 *           example: 101
 *         id_jurusan:
 *           type: integer
 *           description: The ID of the jurusan associated with the lemari
 *           example: 5
 *       required:
 *         - no_lemari
 *         - id_jurusan
 *   security:
 *     - BearerAuth: []
 */


/**
 * @swagger
 * /api/lemari:
 *   post:
 *     summary: Create a new lemari
 *     tags: [Lemari]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - no_lemari
 *               - id_jurusan
 *             properties:
 *               no_lemari:
 *                 type: integer
 *                 description: The number of the lemari
 *                 example: 101
 *               id_jurusan:
 *                 type: integer
 *                 description: The ID of the associated jurusan
 *                 example: 1
 *     responses:
 *       201:
 *         description: The created lemari
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
 *                   example: "Lemari berhasil dibuat"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     no_lemari:
 *                       type: integer
 *                       example: 101
 *                     id_jurusan:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: All fields are required
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
 *                   example: "Semua field harus diisi"
 *       500:
 *         description: Internal server error
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
router.post("/", lemariController.create);

/**
 * @swagger
 * /api/lemari:
 *   get:
 *     summary: Retrieve a list of all lemari
 *     tags: [Lemari]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of lemari
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
 *                   example: "Daftar lemari berhasil diambil"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       no_lemari:
 *                         type: integer
 *                         example: 101
 *                       id_jurusan:
 *                         type: integer
 *                         example: 1
 *       500:
 *         description: Internal server error
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
router.get("/", lemariController.getAll);


/**
 * @swagger
 * /api/lemari/{id}:
 *   get:
 *     summary: Retrieve a lemari by ID
 *     tags: [Lemari]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the lemari to retrieve
 *     responses:
 *       200:
 *         description: A single lemari
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
 *                   example: "Data lemari berhasil diambil"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     no_lemari:
 *                       type: integer
 *                       example: 101
 *                     id_jurusan:
 *                       type: integer
 *                       example: 1
 *       404:
 *         description: Lemari not found
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
 *                   example: "Lemari tidak ditemukan"
 *       500:
 *         description: Internal server error
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
router.get("/:id", lemariController.getById);

/**
 * @swagger
 * /api/lemari/{id}:
 *   put:
 *     summary: Update an existing lemari by ID
 *     tags: [Lemari]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the lemari to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               no_lemari:
 *                 type: integer
 *                 description: The number of the lemari
 *                 example: 102
 *               id_jurusan:
 *                 type: integer
 *                 description: The ID of the associated jurusan
 *                 example: 2
 *     responses:
 *       200:
 *         description: The updated lemari data
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
 *                   example: "Data lemari berhasil diperbarui"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     no_lemari:
 *                       type: integer
 *                       example: 102
 *                     id_jurusan:
 *                       type: integer
 *                       example: 2
 *       400:
 *         description: No fields to update
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
 *                   example: "Tidak ada field yang diubah"
 *       404:
 *         description: Lemari not found or no changes made
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
 *                   example: "Lemari tidak ditemukan atau tidak ada perubahan yang dibuat"
 *       500:
 *         description: Internal server error
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
router.put("/:id", lemariController.update);

/**
 * @swagger
 * /api/lemari/{id}:
 *   delete:
 *     summary: Delete a lemari by ID
 *     tags: [Lemari]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the lemari to delete
 *     responses:
 *       200:
 *         description: Lemari deleted
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
 *                   example: "Lemari berhasil dihapus"
 *       404:
 *         description: Lemari not found
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
 *                   example: "Lemari tidak ditemukan"
 *       500:
 *         description: Internal server error
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
router.delete("/:id", lemariController.delete);

