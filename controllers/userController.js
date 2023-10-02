const { UserService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { SHARED } = require('../utils');

class UserController {
    static async getUsers(req, res) {
        try {
            const { page, size } = req.query;
            const result = await UserService.getUsers(page, size);
            res.status(StatusCodes.OK).json(result);
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errMessage: err.message });
        }
    }

    static async registerUser(req, res) {
        try {
            const { email, gender, password, role } = req.body;
            await UserService.registerUser(email, gender, password, role);
            res.status(StatusCodes.CREATED).json({ message: 'User registered successfully' });
        } catch (err) {
            if (err.name === SHARED.ERR_NAME.CONFLICT_ERROR) {
                res.status(StatusCodes.CONFLICT).json({ errMessage: err.message });
            } else if (err.name === SHARED.ERR_NAME.BAD_REQUEST) {
                res.status(StatusCodes.BAD_REQUEST).json({ errMessage: err.message });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errMessage: err.message });
            }   
        }
    }

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const token = await UserService.loginUser(email, password);
            res.status(StatusCodes.OK).json({ token });
        } catch (err) {
            if (err.name === SHARED.ERR_NAME.NOT_FOUND) {
                res.status(StatusCodes.NOT_FOUND).json({ errMessage: err.message });
            } else if (err.name === SHARED.ERR_NAME.UNAUTHORIZED) {
                res.status(StatusCodes.UNAUTHORIZED).json({ errMessage: err.message });
            } else if (err.name === SHARED.ERR_NAME.BAD_REQUEST) {
                res.status(StatusCodes.BAD_REQUEST).json({ errMessage: err.message });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errMessage: err.message });
            }   
        }
    }
}

module.exports = UserController;