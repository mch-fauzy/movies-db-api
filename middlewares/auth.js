const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { SHARED } = require('../utils')
const CONFIG = require('../configs');
const { logger } = require('../utils')

function authenticateToken(req, res, next) {
    const authHeader = req.headers[SHARED.AUTHORIZATION_HEADER];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        logger.warn('[authenticateToken] Missing token');
        return res.status(StatusCodes.UNAUTHORIZED).json({ errMessage: 'Missing token' });
    }

    jwt.verify(token, CONFIG.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            logger.error('[authenticateToken] Invalid token:', err);
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