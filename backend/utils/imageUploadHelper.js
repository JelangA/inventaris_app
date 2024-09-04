const fs = require('fs');
const path = require('path');

/**
 * Validates the image file.
 * @param {Object} image - The image file to validate.
 * @returns {string | null} - Returns an error message if validation fails, otherwise null.
 */
const validateImage = (image) => {
    if (!image) {
        return 'Image file is required.';
    }

    const ext = path.extname(image.name).toLowerCase();
    const allowedTypes = ['.png', '.jpg', '.jpeg'];
    if (!allowedTypes.includes(ext)) {
        return 'Only PNG, JPG, and JPEG formats are allowed.';
    }

    if (image.size > 5000000) { // 5 MB size limit
        return 'Image must be less than 5 MB.';
    }

    return null; // No validation errors
};

/**
 * Uploads an image to the server.
 * @param {Object} image - The image file to upload.
 * @param {Object} req - Express request object, used to get the protocol and host.
 * @returns {Promise<string>} - Returns a promise that resolves with the image URL or rejects with an error message.
 */
const uploadImage = (image, req) => {
    return new Promise((resolve, reject) => {
        // Validate the image using the validateImage helper function
        const validationError = validateImage(image);
        if (validationError) {
            return reject(validationError);
        }

        const fileName = image.name.replace(/ /g, '_'); // Replace spaces with underscores in the file name
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`; // Construct the image URL
        const imagePath = path.join(__dirname, "../public/images/", fileName); // Set the image path on the server

        // Ensure that the directory exists
        if (!fs.existsSync(path.dirname(imagePath))) {
            fs.mkdirSync(path.dirname(imagePath), { recursive: true });
        }

        // Move the image to the server
        image.mv(imagePath, (err) => {
            if (err) {
                return reject(err.message);
            }
            resolve(url);
        });
    });
};

module.exports = { uploadImage, validateImage };
