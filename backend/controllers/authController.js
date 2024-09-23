const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const respon = require('../utils/responseHelpers');
const {getById} = require('../utils/crudHelper')

controller = {};

controller.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Cari pengguna berdasarkan username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            // Pengguna tidak ditemukan
            return respon.responseErr(res, 'User not found', 404);
        }

        // Periksa password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            // Password tidak valid
            return respon.responseErr(res, 'Invalid Password', 401);
        }

        // Buat token JWT
        const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Kirim respon dengan token JWT
        return respon.response(res, { token }, 200);
    } catch (err) {
        return respon.responseErr(res, err.message, 500);
    }
};

controller.register = async (req, res) => {
    const { name, username, password, tipe_user, no_hp, id_jurusan } = req.body;

    try {
        // Validasi input
        if (!name || !username || !password || !tipe_user || !id_jurusan) {
            return respon.responseErr(res, 'Semua field harus diisi', 400);
        }

        // Periksa apakah username sudah ada
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return respon.responseErr(res, 'Username sudah terdaftar', 400);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat pengguna baru
        const newUser = await User.create({
            name,
            username,
            password: hashedPassword,
            tipe_user,
            no_hp,
            id_jurusan
        });

        return respon.response(res, newUser, 201);
    } catch (err) {
        console.error(err);
        return respon.responseErr(res, err.message, 500);
    }

};

module.exports = controller;
