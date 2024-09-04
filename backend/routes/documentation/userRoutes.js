const userController = require('../../controllers/repository/userRepository');
const User = require("../../models/user");
const respon = require("../../utils/responseHelpers");
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


router.get('/', userController.getAll);

router.post('/', userController.create);

router.get('/:id', userController.getById);

router.put('/:id', userController.update);

router.delete('/:id', userController.delete);

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


