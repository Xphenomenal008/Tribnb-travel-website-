const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'wanderlust_dev',
        format: async (req, file) => 'jpeg', // Use only one format
        allowedFormats: ['png', 'jpg', 'jpeg'] // Optional: Restrict allowed formats
    },
});

module.exports = {
    cloudinary,
    storage, // Export storage for multer
};

//we have made setup to store files in our cloud storage from our form 