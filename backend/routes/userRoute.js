const express = require('express');
const { loginUser, registerUser, adminLogin } = require('../controllers/userController.js'); // Corrected registerUSer to registerUser

const userRouter = express.Router();

userRouter.post('/register', registerUser); // Corrected the function name
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

module.exports = userRouter;               
