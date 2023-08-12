const { UserService } = require('../services/index');

class UserController {
    static async getUsers(req, res) {
        try {
            const { page, size } = req.query;
            const result = await UserService.getUsers(page, size);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async registerUser(req, res) {
        try {
            const { email, gender, password, role } = req.body;
            await UserService.registerUser(email, gender, password, role);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const token = await UserService.loginUser(email, password);
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;