const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const SHARED = require('../utils/const')
const dotenv = require('dotenv');
dotenv.config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers[SHARED.AUTHORIZATION_HEADER];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Missing token' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

function authorizeAdmin(req, res, next) {
    if (req.user.role.toLowerCase() !== SHARED.ROLE.ADMIN) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unauthorized. Only admin can perform this action.' });
    }
    next();
}


module.exports = { authenticateToken, authorizeAdmin };
