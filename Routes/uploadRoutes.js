const express = require('express');
const router = express.Router();
const {upload} = require('../Middleware/Cloudinary');
const {uploadImage} = require('../Controllers/ImageController');

router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;