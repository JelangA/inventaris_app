const Barang = require("../../models/barang");
const {uploadImage} = require("../../utils/imageUploadHelper");
const {responseErr, response} = require("../../utils/responseHelpers");
const {join, basename} = require("node:path");
const {existsSync, unlinkSync} = require("node:fs");
const { createItem, updateItem, deleteItem, getById, getAll } = require("../../utils/crudHelper");

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
controller.getAll = async (req, res) => {
    try {
        const items = await Barang.findAll(); // Retrieve all items
        const formattedItems = items.map(item => ({
            id: item.id,
            no_inventaris: item.no_inventaris,
            jenis_sarana: item.jenis_sarana,
            nama_barang: item.nama_barang,
            spesifikasi: item.spesifikasi,
            satuan: item.satuan,
            jml_layak_pakai: item.jml_layak_pakai,
            jml_tidak_layak_pakai: item.jml_tidak_layak_pakai,
            jumlah_total: item.jumlah_total,
            sumber: item.sumber,
            pengadaan: item.pengadaan,
            foto_barang: item.foto_barang,
        }));

        return response(res, formattedItems); // Return all items
    } catch (error) {
        return responseErr(res, error.message, 500); // Return error message with HTTP status 500
    }
};

module.exports = controller;
