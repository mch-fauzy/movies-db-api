const { UserService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { ViewUserRequest } = require('../models/dto')

class UserController {
    static async viewUser(req, res) {
        try {
            const viewUserRequest = new ViewUserRequest(req.query)
            viewUserRequest.validate()

            const result = await UserService.getUserList(viewUserRequest);
            res.status(StatusCodes.OK).json({ data: result.data, metadata: result.metadata });
        } catch (err) {
            if (err.customError) {
                res.status(err.code).json({ error: err.message });
            }
            else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
            }
        }
    }

    static async registerUser(req, res) {
        try {
            // Need to convert to dto and validate request params
            const { email, gender, password, role } = req.body;
            await UserService.registerUser(email, gender, password, role);
            res.status(StatusCodes.CREATED).json({ message: 'Success' });
        } catch (err) {
            if (err.customError) {
                res.status(err.code).json({ error: err.message });
            }
            else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
            }
        }
    }

    static async loginUser(req, res) {
        try {
            // Need to convert to dto and validate request params
            const { email, password } = req.body;
            const token = await UserService.loginUser(email, password);
            res.status(StatusCodes.OK).json({ data: token });
        } catch (err) {
            if (err.customError) {
                res.status(err.code).json({ error: err.message });
            }
            else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
            }
        }
    }
}

module.exports = UserController;