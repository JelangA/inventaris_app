const { responseErr, response } = require("../utils/responseHelpers");
const {handleSequelizeError} = require("./errorHandler");

/**
 * Helper function to create an item in the database.
 * @param {Object} Model - Sequelize model for the item.
 * @param {Object} data - Data to be inserted into the database.
 * @param {Object} res - Express response object.
 */
const createItem = async (Model, data, res) => {
    try {
        const { id, ...filteredData } = data
        const item = await Model.create(filteredData);
        return response(res, item, 201);
    } catch (error) {
        console.log(error);
        return handleSequelizeError(error, res);
    }
};

/**
 * Helper function to update an existing item in the database.
 * @param {Object} Model - Sequelize model for the item.
 * @param {string} modelName - Name of the model for error messages.
 * @param {number} id - ID of the item to be updated.
 * @param {Object} data - Data to be updated in the database.
 * @param {Object} res - Express response object.
 */
const updateItem = async (Model, modelName, id, data, res) => {
    try {
        if (!data || Object.keys(data).length === 0) {
            return responseErr(res, "No fields to update", 400);
        }

        let item = await Model.findOne({ where: { id } });
        if (!item) {
            return responseErr(res, `${modelName} not found`, 404);
        }

        const [affectedRows] = await Model.update(data, { where: { id } });
        if (affectedRows === 0) {
            return responseErr(res, `${modelName} not found or no changes made`, 404);
        }

        item = await Model.findOne({ where: { id } });
        return response(res, item);
    } catch (error) {
        console.log(error);
        return handleSequelizeError(error, res);
    }
};


/**
 * Helper function to delete an item from the database.
 * @param {Object} Model - Sequelize model for the item.
 * @param {string} modelName - Name of the model for error messages.
 * @param {number} id - ID of the item to be deleted.
 * @param {Object} res - Express response object.
 */
const deleteItem = async (Model, modelName, id, res) => {
    try {
        const deleted = await Model.destroy({ where: { id } });
        if (deleted === 0) {
            return responseErr(res, `${modelName} not found`, 404);
        }

        return response(res, `${modelName} with ID ${id} has been deleted`, 200);
    } catch (error) {
        console.log(error);
        return handleSequelizeError(error, res);
    }
};


/**
 * Helper function to retrieve an item by its ID.
 * @param {Object} Model - Sequelize model for the item.
 * @param {string} modelName - Name of the model for error messages.
 * @param {number} id - ID of the item to be retrieved.
 * @param {Object} res - Express response object.
 */
const getById = async (Model, modelName, id, res) => {
    try {
        const item = await Model.findOne({ where: { id } }); // Find item by ID
        if (!item) {
            return responseErr(res, `${modelName} not found`, 404); // Return error if item not found
        }
        return response(res, item); // Return retrieved item
    } catch (error) {
        console.log(error);
        return responseErr(res, error.message, 500); // Return error message with HTTP status 500
    }
};

/**
 * Helper function to retrieve all items from the database.
 * @param {Object} Model - Sequelize model for the item.
 * @param {Object} res - Express response object.
 */
const getAll = async (Model, res) => {
    try {
        const items = await Model.findAll(); // Retrieve all items
        return response(res, items); // Return all items
    } catch (error) {
        return responseErr(res, error.message, 500); // Return error message with HTTP status 500
    }
};

module.exports = {
    createItem,
    updateItem,
    deleteItem,
    getById,
    getAll
};
