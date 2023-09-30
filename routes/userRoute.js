const express = require('express');
const UserRouter = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');
const { UserController } = require('../controllers/index');

UserRouter.get('/users', authenticateToken, authorizeAdmin, UserController.getUsers);
UserRouter.post('/auth/register', UserController.registerUser);
UserRouter.post('/auth/login', UserController.loginUser);

module.exports = UserRouter;