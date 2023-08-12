const express = require('express');
const UserRouter = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');
const { UserController } = require('../controllers/index');

UserRouter.get('/users', authenticateToken, authorizeAdmin, UserController.getUsers);
UserRouter.post('/register', UserController.registerUser);
UserRouter.post('/login', UserController.loginUser);

module.exports = UserRouter;