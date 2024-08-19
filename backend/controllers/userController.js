const User = require("../models/user");
const respon = require("../utils/helpers");

controller = {};

controller.create = async (req, res) => {
    try {
        if (!req.body.name || !req.body.job || req.body.name.trim() === "" || req.body.job.trim() === "") {
            return respon.responseErr(res, "Error: Name and Job fields are required and cannot be empty");
        }

        const createUser = await User.create(req.body);

        return respon.response(res, createUser, 201);
    } catch (error) {
        console.log(error);
        return respon.responseErr(res, error.message, 500);
    }
};


controller.update = async (req, res) => {
    try {
        // Check if request body is valid
        if (!req.body || Object.keys(req.body).length === 0) {
            return respon.responseErr(res, "Error: No fields to update", 400);
        }
        let updateUser = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (updated === 0) {
            return respon.responseErr(res, "User not found or no changes made", 404);
        }
        let userBaru = await User.findOne({
            where: {
                id: req.params.id,
            },
        });
        return respon.response(res, userBaru);
    } catch (err) {
        console.log(err);
        return respon.responseErr(res, err.message, 500);
    }
};


controller.patch = async (req, res) => {
    try {
        // Check if request body is valid
        if (!req.body || Object.keys(req.body).length === 0) {
            return respon.responseErr(res, "Error: No fields to update", 400);
        }
        // Update the user with the provided data
        const [updated] = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        // Check if the update was successful
        if (updated === 0) {
            return respon.responseErr(res, "User not found or no changes made", 404);
        }

        // Retrieve the updated user data
        const userBaru = await User.findOne({
            where: {
                id: req.params.id,
            },
        });

        return respon.response(res, userBaru);
    } catch (err) {
        console.log(err);
        return respon.responseErr(res, err.message, 500);
    }
};

controller.delete = async (req, res) => {
    try {
        let getOne = await User.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (getOne == null) {
            return respon.responseErr(res, "User Id Not Found", 404)
        }
        await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        return respon.response(res, "User Deleted");

    } catch (error) {
        return respon.responseErr(res, error.message, 500);
    }
}

controller.getAll = async (req, res) => {
    try {
        const delay = parseInt(req.query.delay) || 0;
        await new Promise((resolve) => setTimeout(resolve, delay));

        const listUsers = await User.findAll();
        return respon.response(res, listUsers);
    } catch (error) {
        return respon.responseErr(res, error.message, 500);
    }
};

controller.getById = async (req, res) => {
    let id = req.params.id;
    try {
        const data = await User.findOne({
            where: {
                id: id,
            },
        });
        console.log(data);
        if (data == null) {
            return respon.responseErr(res, "User Id Not Found", 404);
        }
        return respon.response(res, data);

    } catch (error) {
        return respon.responseErr(res, error.message, 500);
    }
}
module.exports = controller;
