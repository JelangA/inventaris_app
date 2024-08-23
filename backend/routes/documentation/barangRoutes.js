const express = require("express");
const router = express.Router();
const BarangController = require('../../controllers/repository/barangRepository');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Barang:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the barang
 *           example: 1
 *         no_inventaris:
 *           type: integer
 *           description: The inventory number of the barang
 *           example: 12345
 *         id_penempatan:
 *           type: integer
 *           description: The placement ID of the barang
 *           example: 10
 *         jenis_sarana:
 *           type: string
 *           description: The type of barang (e.g., alat, bahan)
 *           example: alat
 *         nama_barang:
 *           type: string
 *           description: The name of the barang
 *           example: Laptop
 *         foto_barang:
 *           type: string
 *           description: The URL of the photo of the barang
 *           example: http://example.com/photos/laptop.jpg
 *         spesifikasi:
 *           type: string
 *           description: The specification of the barang
 *           example: Intel Core i7, 16GB RAM, 512GB SSD
 *         satuan:
 *           type: string
 *           description: The unit of measurement for the barang
 *           example: pcs
 *         jml_layak_pakai:
 *           type: integer
 *           description: The number of usable items
 *           example: 5
 *         jml_tidak_layak_pakai:
 *           type: integer
 *           description: The number of unusable items
 *           example: 2
 *         sumber:
 *           type: string
 *           description: The source of the barang
 *           example: Purchase
 *         pengadaan:
 *           type: integer
 *           description: The year of procurement
 *           example: 2023
 *   security:
 *     - BearerAuth: []
 */

/**
 * @swagger
 * /api/barang:
 *   post:
 *     summary: Create a new barang
 *     tags: [Barang]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - no_inventaris
 *               - id_penempatan
 *               - jenis_sarana
 *               - nama_barang
 *               - foto_barang
 *               - spesifikasi
 *               - satuan
 *               - jml_layak_pakai
 *               - jml_tidak_layak_pakai
 *               - sumber
 *               - pengadaan
 *             properties:
 *               no_inventaris:
 *                 type: integer
 *                 description: The inventory number of the barang
 *               id_penempatan:
 *                 type: integer
 *                 description: The placement ID of the barang
 *               jenis_sarana:
 *                 type: string
 *                 description: The type of barang (e.g., alat, bahan)
 *               nama_barang:
 *                 type: string
 *                 description: The name of the barang
 *               foto_barang:
 *                 type: string
 *                 description: The URL of the photo of the barang
 *               spesifikasi:
 *                 type: string
 *                 description: The specification of the barang
 *               satuan:
 *                 type: string
 *                 description: The unit of measurement for the barang
 *               jml_layak_pakai:
 *                 type: integer
 *                 description: The number of usable items
 *               jml_tidak_layak_pakai:
 *                 type: integer
 *                 description: The number of unusable items
 *               sumber:
 *                 type: string
 *                 description: The source of the barang
 *               pengadaan:
 *                 type: integer
 *                 description: The year of procurement
 *     responses:
 *       201:
 *         description: The created barang
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Barang'
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
 *                   example: Bad Request
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
 *                   example: Internal Server Error
 */
router.post("/", BarangController.create);

/**
 * @swagger
 * /api/barang/{id}:
 *   put:
 *     summary: Update an existing barang by ID
 *     tags: [Barang]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the barang to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               no_inventaris:
 *                 type: integer
 *                 description: The inventory number of the barang
 *               id_penempatan:
 *                 type: integer
 *                 description: The placement ID of the barang
 *               jenis_sarana:
 *                 type: string
 *                 description: The type of barang (e.g., alat, bahan)
 *               nama_barang:
 *                 type: string
 *                 description: The name of the barang
 *               foto_barang:
 *                 type: string
 *                 description: The URL of the photo of the barang
 *               spesifikasi:
 *                 type: string
 *                 description: The specification of the barang
 *               satuan:
 *                 type: string
 *                 description: The unit of measurement for the barang
 *               jml_layak_pakai:
 *                 type: integer
 *                 description: The number of usable items
 *               jml_tidak_layak_pakai:
 *                 type: integer
 *                 description: The number of unusable items
 *               sumber:
 *                 type: string
 *                 description: The source of the barang
 *               pengadaan:
 *                 type: integer
 *                 description: The year of procurement
 *     responses:
 *       200:
 *         description: The updated barang data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Barang'
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
 *                   example: Bad Request
 *       404:
 *         description: Barang not found or no changes made
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
 *                   example: Not Found
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
 *                   example: Internal Server Error
 */
router.put("/:id", BarangController.update);

/**
 * @swagger
 * /api/barang/{id}:
 *   delete:
 *     summary: Delete a barang by ID
 *     tags: [Barang]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the barang to delete
 *     responses:
 *       204:
 *         description: Barang deleted
 *       404:
 *         description: Barang not found
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
 *                   example: Barang not found
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
 *                   example: Internal Server Error
 */
router.delete("/:id", BarangController.delete);

/**
 * @swagger
 * /api/barang:
 *   get:
 *     summary: Retrieve a list of barang
 *     tags: [Barang]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of barang
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Barang'
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
 *                   example: Internal Server Error
 */
router.get("/:id", BarangController.getById);

/**
 * @swagger
 * /api/barang:
 *   get:
 *     summary: Retrieve a list of barang
 *     tags: [Barang]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of barang
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Barang'
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
 *                   example: Internal Server Error
 */
router.get("/", BarangController.getAll);


module.exports = router;
