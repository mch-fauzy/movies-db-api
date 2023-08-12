const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'Missing token' });
    }

    jwt.verify(token, 'secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

function authorizeAdmin(req, res, next) {
    if (req.user.role.toLowerCase() !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized. Only admin can perform this action.' });
    }
    next();
}


module.exports = { authenticateToken, authorizeAdmin };
