const userController = require('../../controllers/repository/userRepository');
const express = require("express");
const middleware = require("../../middleware/authMiddleware");
const router =  express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the user
 *           example: 1
 *         name:
 *           type: string
 *           description: The full name of the user
 *           example: John Doe
 *         username:
 *           type: string
 *           description: The username of the user
 *           example: johndoe
 *         password:
 *           type: string
 *           description: The hashed password of the user
 *           example: $2b$10$KIXz5Axz4F.gkDQsbyIR2eS5.I0QjsFLl2ejAl3GCwJ7dtc6qI6iu
 *         tipe_user:
 *           type: string
 *           description: The type of user (e.g., admin, user)
 *           example: admin
 *         no_hp:
 *           type: string
 *           description: The phone number of the user
 *           example: +6281234567890
 *       required:
 *         - name
 *         - username
 *         - password
 *         - tipe_user
 *         - no_hp
 *   security:
 *     - BearerAuth: []
 */


/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
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
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   username:
 *                     type: string
 *                     example: "johndoe"
 *                   no_hp:
 *                     type: string
 *                     example: "1234567890"
 *                   tipe_user:
 *                     type: string
 *                     example: "admin"
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
router.get('/user', userController.getAll);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - password
 *               - tipe_user
 *               - no_hp
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: "John Doe"
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: "securepassword123"
 *               tipe_user:
 *                 type: string
 *                 description: The type of user
 *                 example: "admin"
 *               no_hp:
 *                 type: string
 *                 description: The phone number of the user
 *                 example: "1234567890"
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User berhasil dibuat"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     username:
 *                       type: string
 *                       example: "johndoe"
 *                     no_hp:
 *                       type: string
 *                       example: "1234567890"
 *                     tipe_user:
 *                       type: string
 *                       example: "admin"
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
router.post('/user', userController.create);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 username:
 *                   type: string
 *                   example: "johndoe"
 *                 no_hp:
 *                   type: string
 *                   example: "1234567890"
 *                 tipe_user:
 *                   type: string
 *                   example: "admin"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User tidak ditemukan"
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
router.get('/user/:id', userController.getById);

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update an existing user by ID
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: "John Doe"
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: "newsecurepassword123"
 *               tipe_user:
 *                 type: string
 *                 description: The type of user
 *                 example: "admin"
 *               no_hp:
 *                 type: string
 *                 description: The phone number of the user
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: The updated user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User berhasil diperbarui"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     username:
 *                       type: string
 *                       example: "johndoe"
 *                     no_hp:
 *                       type: string
 *                       example: "1234567890"
 *                     tipe_user:
 *                       type: string
 *                       example: "admin"
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
 *         description: User not found or no changes made
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User tidak ditemukan atau tidak ada perubahan"
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
router.put('/user/:id', userController.update);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User berhasil dihapus"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User tidak ditemukan"
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
router.delete('/user/:id', userController.delete);

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Retrieve the profile of the currently authenticated user
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 username:
 *                   type: string
 *                   example: "johndoe"
 *                 no_hp:
 *                   type: string
 *                   example: "1234567890"
 *                 tipe_user:
 *                   type: string
 *                   example: "admin"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token tidak valid atau tidak ditemukan"
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
router.get('/profile', middleware.verifyToken, async (req, res) => {
    try {
        // Ambil ID pengguna dari req.user
        const userId = req.user.userId;

        // Cari pengguna berdasarkan ID
        const user = await User.findByPk(userId);
        if (!user) {
            return respon.responseErr(res, 'User not found', 404);
        }

        // Kirim detail pengguna
        return respon.response(res, user, 200);
    } catch (err) {
        return respon.responseErr(res, err.message, 500);
    }
});

module.exports = router;


