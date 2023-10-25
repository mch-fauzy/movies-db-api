const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { SHARED } = require('../utils')
const CONFIG = require('../configs');
const { logger } = require('../utils')

function authenticateToken(req, res, next) {
    const authHeader = req.headers[SHARED.AUTHORIZATION_HEADER];

    // Check if authHeader is exist and get the token only (Bearer <Token>)
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        logger.warn('[authenticateToken] Missing token');
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Missing token' });
    }

    jwt.verify(token, CONFIG.APP.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
            logger.error('[authenticateToken] Invalid token:', err);
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
        }

        // Assign user to request
        req.user = user;
        next();
    });
}

function authorizeAdmin(req, res, next) {
    if (req.user.role.toLowerCase() !== SHARED.ROLE.ADMIN) {
        return res.status(StatusCodes.FORBIDDEN).json({ error: 'Unauthorized: Only admin can perform this action' });
    }
    next();
}


module.exports = { authenticateToken, authorizeAdmin };