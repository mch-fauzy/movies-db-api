const { authenticateToken, authorizeAdmin } = require('./auth');
const uploadImage = require('./upload');

module.exports = {
    authenticateToken,
    authorizeAdmin,
    uploadImage
};
