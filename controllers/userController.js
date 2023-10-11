const { UserService } = require('../services');
const { StatusCodes } = require('http-status-codes');

class UserController {
    static async getUsers(req, res) {
        try {
            // Need to convert to dto and validate request params
            const { page, size } = req.query;
            const result = await UserService.getUsers(page, size);
            res.status(StatusCodes.OK).json(result);
        } catch (err) {
            res.status(err.code).json({ errMessage: err.message });
        }
    }

    static async registerUser(req, res) {
        try {
            // Need to convert to dto and validate request params
            const { email, gender, password, role } = req.body;
            await UserService.registerUser(email, gender, password, role);
            res.status(StatusCodes.CREATED).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(err.code).json({ errMessage: err.message }); 
        }
    }

    static async loginUser(req, res) {
        try {
            // Need to convert to dto and validate request params
            const { email, password } = req.body;
            const token = await UserService.loginUser(email, password);
            res.status(StatusCodes.OK).json({ token });
        } catch (err) {
            res.status(err.code).json({ errMessage: err.message });
        }
    }
}

module.exports = UserController;