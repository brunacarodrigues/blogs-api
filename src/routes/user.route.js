const express = require('express');
const { userController } = require('../controllers');
const { validateUser, validateToken } = require('../middlewares');

const userRoute = express();

userRoute.post('/user', validateUser, userController.createUser);
userRoute.get('/user', validateToken, userController.getAllUsers);
userRoute.get('/user/:id', validateToken, userController.getByIdUser);

module.exports = userRoute;