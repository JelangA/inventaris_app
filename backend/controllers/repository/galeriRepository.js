const galeriRuangan = require('../../models/galeri_ruangan');
const {createItem, updateItem, deleteItem, getById, getAll} = require('../../utils/crudHelper');
const {uploadImage, validateImage} = require("../../utils/imageUploadHelper");
const {response, responseErr} = require('../../utils/responseHelpers');


const repository = {};

// Create a new galeriRuangan
repository.create = async (req, res) => {
    try {
        const { id_ruangan, ...otherData } = req.body; // Extract fields from request body
        const image = req.files?.foto_ruangan; // Extract image from request files

        // **Validation: Check required fields**
        if (!id_ruangan) {
            return responseErr(res, "id_ruangan is required", 400);
        }

        // **Validation: Image**
        const imageError = validateImage(image);
        if (imageError) {
            return responseErr(res, imageError, 400);
        }

        // Upload image
        try {
            const imageUrl = await uploadImage(image, req);
            const data = {
                id_ruangan: id_ruangan,
                ...otherData,
                foto_ruangan: imageUrl
            };

            // Create new record in the database
            await createItem(galeriRuangan, data, res);
        } catch (error) {
            console.log("ERROR uploading image:", error.message);
            if (!res.headersSent) {
                return responseErr(res, "Error uploading image", 500);
            }
        }
    } catch (error) {
        console.log("Error in controller:", error.message);
        if (!res.headersSent) {
            return responseErr(res, error.message, 500);
        }
    }
};

// Update an existing galeriRuangan
repository.update = async (req, res) => {
    try {
        const { id } = req.params;
        const image = req.files?.foto_ruangan;
        const { id_ruangan, ...otherData } = req.body;

        // **Validation: Check required fields**
        if (!id_ruangan) {
            return responseErr(res, "id_ruangan is required", 400);
        }

        // **Validation: Check if the record exists**
        const existingRecord = await galeriRuangan.findByPk(id);
        if (!existingRecord) {
            return responseErr(res, `Galeri Ruangan with ID ${id} not found`, 404);
        }

        // **Validation: Image (if provided)**
        const imageError = validateImage(image);
        if (imageError) {
            return responseErr(res, imageError, 400);
        }

        let dataToUpdate = { id_ruangan: id_ruangan, ...otherData };

        // Upload image if provided
        if (image) {
            try {
                dataToUpdate.foto_ruangan = await uploadImage(image, req);
            } catch (error) {
                console.log("ERROR uploading image:", error.message);
                if (!res.headersSent) {
                    return responseErr(res, "Error uploading image", 500);
                }
            }
        }

        // Update record in the database
        await updateItem(galeriRuangan, 'Galeri Ruangan', id, dataToUpdate, res);
    } catch (error) {
        console.log("Error in update controller:", error.message);
        if (!res.headersSent) {
            return responseErr(res, error.message, 500);
        }
    }
};

// Delete a galeriRuangan
repository.delete = (req, res) => deleteItem(galeriRuangan, 'Galeri Ruangan', req.params.id, res);

// Get a galeriRuangan by ID
repository.getById = (req, res) => getById(galeriRuangan, 'Galeri Ruangan', req.params.id, res);

// Get all galeriRuangan
repository.getAll = (req, res) => getAll(galeriRuangan, res);

module.exports = repository;