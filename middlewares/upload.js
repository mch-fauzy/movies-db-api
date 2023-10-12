const multer = require('multer');
const path = require('path');
const { SHARED } = require('../utils')
const CONFIG = require('../configs')

function imageValidation(req, file, cb){
  const filename = file.originalname.replace(SHARED.REGEX_PTRN.WHITESPACE, '-');;

  // add params into request (in multer must be updated directly overwrite to object)
  req.file = file;
  req.file.filename = filename;
  req.file.isFilenameValid = true;
  req.file.isFiletypeValid = true;

  // Multer Check if filename is valid
  const filenameCheck = filename.trim().split('.')[0]
  if (filenameCheck.length < 4) {
    req.file.isFilenameValid = false;
    return cb(null, false)
  }

  // Multer Check if filetype is an image
  if (!file.mimetype.startsWith(SHARED.MULTER_UPLOAD.IMAGE)) {
    req.file.isFiletypeValid = false;
    return cb(null, false);
  }
  
  cb(null, true);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, CONFIG.IMG.STATIC_LOC)); // Specify the directory to store the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.filename);
  },
});

const uploadImage = multer({ 
  fileFilter: imageValidation,
  storage: storage,
}).single(SHARED.MULTER_UPLOAD.IMAGE);

module.exports = uploadImage;