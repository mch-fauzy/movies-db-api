// passwords should be hashed and stored securely using a one-way hashing function (like bcrypt or bcryptjs). Hashing is designed to be irreversible, which is a security measure to protect user data.
function encryptPassword(password){
    const encryptedPassword = Buffer.from(password).toString('base64');
    return encryptedPassword;
};

function decryptPassword(encryptedPassword) {
    const decryptedPassword = Buffer.from(encryptedPassword, 'base64').toString();
    return decryptedPassword;
};

module.exports = { encryptPassword, decryptPassword };