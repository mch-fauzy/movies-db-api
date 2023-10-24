const express = require('express');
const userRouter = express.Router();
const { authenticateToken, authorizeAdmin } = require('../../middlewares/auth');
const { UserController } = require('../../controllers/index');

userRouter.get('/users', authenticateToken, authorizeAdmin, UserController.viewUser);
userRouter.post('/auth/register', UserController.registerUser);
userRouter.post('/auth/login', UserController.loginUser);

module.exports = userRouter;