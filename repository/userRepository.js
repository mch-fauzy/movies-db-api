const infras = require('../infras');
const jwt = require('jsonwebtoken');
const { NotFoundError, AuthenticationError, ConflictError, InternalError, encryptPassword, decryptPassword, SHARED, logger } = require('../utils');
const CONFIG = require('../configs');
const { buildUserListModel } = require('../models')

class UserRepository {
    static async getUser(pagination) {
        try {
            const countUsersQuery = 'SELECT COUNT(id) AS count FROM users';
            const selectUsersQueryWithMetadata = `
            SELECT 
                id,
                email, 
                gender, 
                role,
                (${countUsersQuery})
            FROM 
                users 
            LIMIT $1 OFFSET $2`;

            const offset = (pagination.page - 1) * pagination.pageSize;
            const result = await infras.pool.query(selectUsersQueryWithMetadata, [pagination.pageSize, offset]);

            return buildUserListModel(result.rows)
        } catch (err) {
            if (err.customError) {
                throw err;
            } else {
                logger.error(`[UserRepository - getUsers] ${err.message}`);
                throw new Error(`${err.message}`);
            }
        }
    }

    static async registerUser(email, gender, password) {
        try {
            const emailExistsQuery = 'SELECT id FROM users WHERE email = $1';
            const emailExistsResult = await infras.pool.query(emailExistsQuery, [email]);

            if (emailExistsResult.rows.length > 0) {
                logger.error("[UserRepository - registerUser] Email already exists");
                throw new ConflictError('Email already exists');
            }

            const query = 'INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)';
            const maxIdResult = await infras.pool.query('SELECT MAX(id) FROM users');
            const maxId = maxIdResult.rows[0].max || 0;
            const id = maxId + 1;
            const encryptedPassword = encryptPassword(password);
            const role = SHARED.ROLE.NON_ADMIN;
            await infras.pool.query(query, [id, email, gender, encryptedPassword, role]);
        } catch (err) {
            if (!err.customError) {
                logger.error(`[UserRepository - registerUser] Internal server error: ${err.message}`);
                throw new InternalError("Internal server error");
            } else {
                throw err;
            }
        }
    }

    // move login to service, change it to check user by email
    static async isUserExistByEmail(email) {
        const query = ```
        SELECT 
            id
        FROM 
            users 
        WHERE 
            email = $1
        ```;

        const result = await infras.pool.query(query, [email]);

        if (result.rowCount === 0) {
            logger.error("[UserRepository - isUserExistByEmail] User not found");
            throw new NotFoundError('User not found');
        }

        return result;
    }

    static async loginUser(email, password) {
        try {
            const query = 'SELECT id, email, password, role FROM users WHERE email = $1';
            const result = await infras.pool.query(query, [email]);

            if (result.rowCount === 0) {
                logger.error("[UserRepository - loginUser] User not found");
                throw new NotFoundError('User not found');
            }

            const user = result.rows[0];
            const decryptedPassword = decryptPassword(user.password)
            if (user && decryptedPassword === password) {
                const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, CONFIG.APP.JWT_ACCESS_KEY, { expiresIn: '1h' });
                return {
                    token: token
                };
            } else {
                logger.error("[UserRepository - loginUser] Incorrect password");
                throw new AuthenticationError("Incorrect password");
            }

        } catch (err) {
            if (!err.customError) {
                logger.error(`[UserRepository - loginUser] Internal server error: ${err.message}`);
                throw new InternalError("Internal server error");
            } else {
                throw err;
            }
        }
    }
}
module.exports = UserRepository;