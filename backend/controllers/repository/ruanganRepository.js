const Ruangan = require('../../models/ruangan');
const {createItem, updateItem, deleteItem, getById, getAll} = require('../../utils/crudHelper');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const respon = require('../../utils/responseHelpers');
const {uploadImage} = require("../../utils/imageUploadHelper");

const controller = {};


controller.create = async (req, res) => {
    try {
        const image = req.files.foto_ruangan;

        try {
            const imageUrl = await uploadImage(image, req);

            const data = {
                nama_ruangan: req.body.nama_ruangan,
                luas_ruangan: req.body.luas_ruangan,
                foto_ruangan: imageUrl,
                inventaris_sapras: req.body.inventaris_sapras,
            };

            // Ensure that `createItem` handles the response
            await createItem(Ruangan, data, res);

        } catch (err) {
            console.log("Error in image upload: ", err);
            if (!res.headersSent) {
                return respon.responseErr(res, err, 500);
            }
        }
    } catch (err) {
        console.log("Error in controller: ", err.message);
        if (!res.headersSent) {
            return respon.responseErr(res, err.message, 500);
        }
    }
};

// Update an existing ruangan
controller.update = async (req, res) => {
    try {
        const existingData = await Ruangan.findByPk(req.params.id); // Ambil data yang ada

        if (!existingData) {
            return respon.responseErr(res, 'Data not found', 404);
        }

        const data = {
            nama_ruangan: req.body.nama_ruangan,
            luas_ruangan: req.body.luas_ruangan,
            inventaris_sapras: req.body.inventaris_sapras,
        };

        if (req.files && req.files.foto_ruangan) {
            const image = req.files.foto_ruangan;

            try {
                // Jika ada gambar baru, update URL gambar
                data.foto_ruangan = await uploadImage(image, req);

                // Hapus gambar lama jika ada
                if (existingData.foto_ruangan) {
                    const oldImagePath = path.join(__dirname, "../../public/images/", path.basename(existingData.foto_ruangan));
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
            } catch (err) {
                console.log("Error in image upload: ", err);
                if (!res.headersSent) {
                    return respon.responseErr(res, err.message, 500);
                }
            }
        } else {
            // Jika tidak ada gambar baru, tetap gunakan URL gambar yang ada
            data.foto_ruangan = existingData.foto_ruangan;
        }

        await updateItem(Ruangan, 'Ruangan', req.params.id, data, res);
    } catch (error) {
        // Penanganan error global jika diperlukan
        console.log("Error in update controller: ", error.message);
        if (!res.headersSent) {
            return respon.responseErr(res, error.message, 500);
        }
    }
};

// Delete a ruangan
controller.delete = (req, res) => deleteItem(Ruangan, 'Ruangan', req.params.id, res);

// Get a ruangan by ID
controller.getById = (req, res) => getById(Ruangan, 'Ruangan', req.params.id, res);

// Get all ruangans
controller.getAll = (req, res) => getAll(Ruangan, res);

module.exports = controller;
