const { UserRepository } = require('../repository/index');

class UserService {
    static async getUsers(page, size) {
        try {
            return await UserRepository.getUsers(page, size);
        } catch (error) {
            throw error;
        }
    }

    static async registerUser(email, gender, password, role) {
        try {
            return await UserRepository.registerUser(email, gender, password, role);
        } catch (error) {
            throw error;
        }
    }

    static async loginUser(email, password) {
        try {
            return await UserRepository.loginUser(email, password);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
