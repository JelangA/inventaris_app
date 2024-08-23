const User = require("../../models/user");
const { createItem, updateItem, deleteItem, getById, getAll } = require("../../utils/crudHelper");
const respon = require("../../utils/responseHelpers");
const handling = require("../../utils/errorHandler"); //logic CRUD

const controller = {};

// Create a new user
controller.create = (req, res) => createItem(User, req.body, res);

// Update an existing user
controller.update = (req, res) => updateItem(User, 'User', req.params.id, req.body, res);

// Delete a user
controller.delete = (req, res) => deleteItem(User, 'User', req.params.id, res);

// Get a user by ID
controller.getById = (req, res) => getById(User, 'User', req.params.id, res);

// Get all users
controller.getAll = (req, res) => getAll(User, res);

controller.getProfile = async (req, res) => {
    try {
        const respon = require("../../utils/responseHelpers");
        const userId = req.user.userId;

        // Cari pengguna berdasarkan ID
        const user = await User.findByPk(userId);

        console.log(user);

        // Jika user tidak ditemukan
        if (!user) {
            return respon.responseErr(res, "User not found", 404);
        }

        // Kirim detail pengguna
        return respon.response(res, user, 200);
    } catch (error) {
        const handling = require("../../utils/errorHandler");
        return handling.handleSequelizeError(error, res);
    }
};



module.exports = controller;
