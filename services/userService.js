const { UserRepository } = require('../repository');
const { BadRequestError } = require('../utils');
const { logger } = require('../utils');

class UserService {
    static async getUsers(page, size) {
        try {
            return await UserRepository.getUsers(page, size);
        } catch (err) {
            throw err;
        }
    }

    static async registerUser(email, gender, password) {
        try {
            if (!email || !password || !gender) {
                logger.error("[UserService.registerUser] Email, password, and gender fields are required");
                throw new BadRequestError('Email, password, and gender fields are required');
            }
            return await UserRepository.registerUser(email, gender, password);
        } catch (err) {
            throw err;
        }
    }

    static async loginUser(email, password) {
        try {
            if (!email || !password) {
                logger.error("[UserService.loginUser] Email and password fields are required");
                throw new BadRequestError("Email and password fields are required")
            }
            return await UserRepository.loginUser(email, password);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserService;