const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const SHARED = require('../utils/const')

function authenticateToken(req, res, next) {
    const authHeader = req.headers[SHARED.AUTHORIZATION_HEADER];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ errMessage: 'Missing token' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ errMessage: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

function authorizeAdmin(req, res, next) {
    if (req.user.role.toLowerCase() !== SHARED.ROLE.ADMIN) {
        return res.status(StatusCodes.FORBIDDEN).json({ errMessage: 'Unauthorized. Only admin can perform this action.' });
    }
    next();
}


module.exports = { authenticateToken, authorizeAdmin };