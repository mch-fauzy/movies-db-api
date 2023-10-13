const { authenticateToken, authorizeAdmin } = require('./auth');
const { uploadImageToLocal, uploadImageToCloud } = require('./uploadImage');

module.exports = {
    authenticateToken,
    authorizeAdmin,
    uploadImageToLocal,
    uploadImageToCloud,
};
