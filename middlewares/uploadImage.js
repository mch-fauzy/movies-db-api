const multer = require('multer');
const { SHARED } = require('../utils');
const CONFIG = require('../configs');

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

// For Local system
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory to store the uploaded files
    cb(null, CONFIG.APP.IMG_STORAGE_PATH); 
  },
  filename: function (req, file, cb) {
    cb(null, file.filename);
  },
});

const uploadImageToLocal = multer({ 
  fileFilter: imageValidation,
  storage: localStorage,
}).single(SHARED.MULTER_UPLOAD.IMAGE);

// For Cloud
const cloudStorage = multer.memoryStorage();

const uploadImageToCloud = multer({ 
  fileFilter: imageValidation,
  storage: cloudStorage,
}).single(SHARED.MULTER_UPLOAD.IMAGE);

module.exports = {
  uploadImageToLocal,
  uploadImageToCloud,
}