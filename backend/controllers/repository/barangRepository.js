const Barang = require("../../models/barang");
const { createItem, updateItem, deleteItem, getById, getAll } = require("../../utils/crudHelper");
const {uploadImage} = require("../../utils/imageUploadHelper");
const {responseErr} = require("../../utils/responseHelpers");
const {join, basename} = require("node:path");
const {existsSync, unlinkSync} = require("node:fs");

const controller = {};

// Create a new barang
controller.create = async (req, res) => {
    try {
        if (!req.files || !req.files.foto_barang) {
            return responseErr(res, 'Foto barang harus diunggah', 400);
        }

        const image = req.files.foto_barang;
        const fotoBarangUrl = await uploadImage(image, req);

        const data = {
            ...req.body,
            foto_barang: fotoBarangUrl,
        };

        await createItem(Barang, data, res);
    } catch (error) {
        console.log("Error in controller.create: ", error);
        if (!res.headersSent) {
            return responseErr(res, error.message, 500);
        }
    }
};

// Update an existing barang with optional photo upload
controller.update = async (req, res) => {
    try {
        const existingData = await Barang.findByPk(req.params.id);
        if (!existingData) {
            return responseErr(res, 'Data not found', 404);
        }

        let fotoBarangUrl = existingData.foto_barang;

        if (req.files && req.files.foto_barang) {
            const image = req.files.foto_barang;
            try {
                // Upload new image and get its URL
                fotoBarangUrl = await uploadImage(image, req);

                // Delete old image if it exists
                const oldImagePath = join(__dirname, "../../public/images/", basename(existingData.foto_barang));
                if (existsSync(oldImagePath)) {
                    unlinkSync(oldImagePath);
                }
            } catch (err) {
                console.log("Error in image upload: ", err);
                if (!res.headersSent) {
                    return responseErr(res, err, 500);
                }
            }
        }

        const data = {
            ...req.body,
            foto_barang: fotoBarangUrl,
        };

        await updateItem(Barang, 'Barang', req.params.id, data, res);
    } catch (error) {
        console.log("Error in controller.update: ", error);
        if (!res.headersSent) {
            return responseErr(res, error.message, 500);
        }
    }
};

// Delete a barang
controller.delete = (req, res) => deleteItem(Barang, 'Barang', req.params.id, res);

// Get a barang by ID
controller.getById = (req, res) => getById(Barang, 'Barang', req.params.id, res);

// Get all barang
controller.getAll = (req, res) => getAll(Barang, res);

module.exports = controller;
