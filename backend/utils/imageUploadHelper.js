const fs = require('fs');
const path = require('path');

const uploadImage = (image, req) => {
    return new Promise((resolve, reject) => {
        if (!image) {
            return reject('No file uploaded or file is missing.');
        }

        const ext = path.extname(image.name).toLowerCase();
        const allowedType = [".png", ".jpg", ".jpeg"];
        if (!allowedType.includes(ext)) {
            return reject("Data format not supported");
        }

        if (image.size > 5000000) {
            return reject("Image must be less than 5 MB");
        }

        const fileName = image.name.replace(/ /g, '_');
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        const imagePath = path.join(__dirname, "../../public/images/", fileName);

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

module.exports = { uploadImage };