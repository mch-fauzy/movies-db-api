const pool = require('../infras/postgresql');
const { UserModel } = require('../models/index');
const { encryptPassword, decryptPassword } = require('../utils/password');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class UserRepository {
    static async getUsers(page = 1, size = 10) {
        try {
            page = parseInt(page);
            size = parseInt(size);
            const offset = (page - 1) * size;
            const query = 'SELECT id, email, gender, role FROM users LIMIT $1 OFFSET $2';
            const result = await pool.query(query, [size, offset]);

            const totalRows = parseInt((await pool.query('SELECT COUNT(*) FROM users')).rows[0].count);
            const totalPages = Math.ceil(totalRows / size);

            const users = result.rows.map(row => UserModel.fromDatabase(row));

            return {
                data: users,
                totalData: totalRows,
                totalPages: totalPages,
                currentPage: page,
                nextPage: page < totalPages ? page + 1 : null,
                previousPage: page > 1 ? page - 1 : null,
            };
        } catch (error) {
            throw error;
        }
    }

    static async registerUser(email, gender, password) {
        try {
            const query = 'INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)';

            const emailExistsQuery = 'SELECT id FROM users WHERE email = $1';
            const emailExistsResult = await pool.query(emailExistsQuery, [email]);

            if (!email || !password || !gender) {
                throw new Error('email, password, gender and role fields are required');
            }

            if (emailExistsResult.rows.length > 0) {
                throw new Error('Email already exists');
            }

            const maxIdResult = await pool.query('SELECT MAX(id) FROM users');
            const maxId = maxIdResult.rows[0].max || 0;
            const id = maxId + 1;
            const encryptedPassword = encryptPassword(password);
            const role = "non-admin";
            await pool.query(query, [id, email, gender, encryptedPassword, role]);
        } catch (error) {
            throw error;
        }
    }

    static async loginUser(email, password) {
        try {
            const query = 'SELECT id, email, password, role FROM users WHERE email = $1';
            const result = await pool.query(query, [email]);
            const user = result.rows[0];

            if (!email || !password) {
                throw new Error('email and password fields are required');
            }

            const decryptedPassword = decryptPassword(user.password)
            if (user && decryptedPassword === password) {
                const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                return token;
            }
        } catch (error) {
            throw error;
        }
    }
}
module.exports = UserRepository;
