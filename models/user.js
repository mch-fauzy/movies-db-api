const pool = require('../db/postgresql');
const jwt = require('jsonwebtoken');

class User {
    static async getUsers(page = 1, size = 10) {
        try {
            page = parseInt(page)
            size = parseInt(size)
            const offset = (page - 1) * size;
            const query = 'SELECT * FROM users LIMIT $1 OFFSET $2';
            const result = await pool.query(query, [size, offset]);
            const totalRows = parseInt((await pool.query('SELECT COUNT(*) FROM users')).rows[0].count);
            const totalPages = Math.ceil(totalRows / size);
            return {
                data: result.rows,
                totalData: totalRows,
                totalPages,
                currentPage: page,
                nextPage: page < totalPages ? page + 1 : null,
                previousPage: page > 1 ? page - 1 : null,
            };
        } catch (error) {
            throw error;
        }
    }

    static async registerUser(email, gender, password, role) {
        try {
            const query = 'INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)';

            const emailExistsQuery = 'SELECT id FROM users WHERE email = $1';
            const emailExistsResult = await pool.query(emailExistsQuery, [email]);
            if (emailExistsResult.rows.length > 0) {
                throw new Error('Email already exists');
            }

            // Get the maximum ID value from the users table
            const maxIdResult = await pool.query('SELECT MAX(id) FROM users');
            const maxId = maxIdResult.rows[0].max || 0;
            const id = maxId + 1;
            const encryptedPassword = encryptPassword(password);
            await pool.query(query, [id, email, gender, encryptedPassword, role]);
        } catch (error) {
            throw error;
        }
    }

    static async loginUser(email, password) {
        try {
            const query = 'SELECT * FROM users WHERE email = $1';
            const result = await pool.query(query, [email]);
            const user = result.rows[0];

            if (!email || !password) {
                throw new Error('email and password fields are required');
            }

            const decryptedPassword = decryptPassword(user.password)
            if (user && decryptedPassword === password) {
                const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'secret-key', { expiresIn: '1h' });
                return token;
            }
        } catch (error) {
            throw error;
        }
    }
}


// passwords should be hashed and stored securely using a one-way hashing function (like bcrypt or bcryptjs). Hashing is designed to be irreversible, which is a security measure to protect user data.
function encryptPassword(password){
    const encryptedPassword = Buffer.from(password).toString('base64');
    return encryptedPassword;
};

function decryptPassword(encryptedPassword) {
    const decryptedPassword = Buffer.from(encryptedPassword, 'base64').toString();
    return decryptedPassword;
};

module.exports = User;