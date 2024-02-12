const models = require('../models');

function uploadImage(req, res) {
    if (req.file.filename) {
        res.status(200).json({
            "status": true,
            "message": "Image uploaded successfully",
            "url": req.file.filename
        });
    } else {
        res.status(500).json({
            "status": false,
            "message": "Something went wrong",
        });
    };
}


module.exports = {
    uploadImage: uploadImage
}