const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images')); // Specify the directory to store the uploaded files
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const filename = originalname.replace(/\s+/g, '-');
    cb(null, filename); // Generate a unique filename
  }
});

const upload = multer({ storage: storage });

module.exports = upload;