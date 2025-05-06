exports.uploadImage = (req, res) => {
    try {
        const imageUrl = req.file.path;
        return res.status(200).json({ imageUrl});
    } catch (err) {
        return res.status(500).json({ message: 'failed to upload image'});
    }
}