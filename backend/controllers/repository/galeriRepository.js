const GaleriRuangan = require('../../models/galeri_ruangan');
const { uploadArrayImage, validateImage, uploadImage } = require("../../utils/imageUploadHelper");
const { response, responseErr } = require('../../utils/responseHelpers');
const {getById, deleteItem, getAll} = require("../../utils/crudHelper");

const repository = {};

// Create a new galeriRuangan (with multiple images)
repository.create = async (req, res) => {
    try {
        const { id_ruangan, ...otherData } = req.body; // Extract fields from request body
        const images = req.files?.foto_ruangan; // Extract image array from request files

        // **Validation: Check required fields**
        if (!id_ruangan) {
            return responseErr(res, "id_ruangan is required", 400);
        }

        // **Validation: Images**
        if (!images || images.length === 0) {
            return responseErr(res, "At least one image is required", 400);
        }

        // If there's only one image, convert it to an array
        const imageArray = Array.isArray(images) ? images : [images];

        const createdRecords = []; // To store created records

        // Loop through each image and validate/upload
        for (const image of imageArray) {
            const imageError = validateImage(image);
            if (imageError) {
                return responseErr(res, imageError, 400);
            }

            // Upload each image
            try {
                const imageUrl = await uploadImage(image, req);
                const data = {
                    id_ruangan: id_ruangan,
                    ...otherData,
                    foto_ruangan: imageUrl
                };

                // Create new record for each image
                const createdRecord = await GaleriRuangan.create(data);
                createdRecords.push(createdRecord); // Push created record into array
            } catch (error) {
                console.log("ERROR uploading image:", error.message);
                return responseErr(res, "Error uploading image", 500);
            }
        }

        // Send response after all records are created
        return response(res, createdRecords);
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
        const images = req.files?.foto_ruangan;
        const { id_ruangan, ...otherData } = req.body;

        // **Validation: Check required fields**
        if (!id_ruangan) {
            return responseErr(res, "id_ruangan is required", 400);
        }

        // **Validation: Check if the record exists**
        const existingRecord = await GaleriRuangan.findByPk(id);
        if (!existingRecord) {
            return responseErr(res, `Galeri Ruangan with ID ${id} not found`, 404);
        }

        let dataToUpdate = { id_ruangan: id_ruangan, ...otherData };

        // **Validation: Image (if provided)**
        if (images && images.length > 0) {
            const imageUrls = [];

            // Convert single image to array if necessary
            const imageArray = Array.isArray(images) ? images : [images];

            // Loop through each image and validate/upload
            for (const image of imageArray) {
                const imageError = validateImage(image);
                if (imageError) {
                    return responseErr(res, imageError, 400);
                }

                // Upload each image
                try {
                    const imageUrl = await uploadImage(image, req);
                    imageUrls.push(imageUrl);
                } catch (error) {
                    console.log("ERROR uploading image:", error.message);
                    return responseErr(res, "Error uploading image", 500);
                }
            }

            dataToUpdate.foto_ruangan = imageUrls; // Update with array of image URLs
        }

        // Update record in the database
        const updatedRecord = await GaleriRuangan.update(dataToUpdate, {
            where: { id: id },
            returning: true // To get the updated record back
        });

        if (updatedRecord[0] === 0) {
            return responseErr(res, "Failed to update record", 500);
        }

        return response(res, updatedRecord[1][0]); // Send the updated record
    } catch (error) {
        console.log("Error in update controller:", error.message);
        if (!res.headersSent) {
            return responseErr(res, error.message, 500);
        }
    }
};

// Delete a galeriRuangan
repository.delete = (req, res) => deleteItem(GaleriRuangan, 'Galeri Ruangan', req.params.id, res);

// Get a galeriRuangan by ID
repository.getById = (req, res) => getById(GaleriRuangan, 'Galeri Ruangan', req.params.id, res);

// Get all galeriRuangan
repository.getAll = (req, res) => getAll(GaleriRuangan, res);

module.exports = repository;
