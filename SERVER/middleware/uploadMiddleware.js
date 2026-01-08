const multer = require('multer');
const path = require('path');

// Configure storage in memory (buffer) for AI processing
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const filetypes = /pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only PDF files are allowed!'));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter
});

module.exports = upload;