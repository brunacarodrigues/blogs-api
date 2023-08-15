const express = require('express');
const { userController } = require('../controllers');
const { validateUser } = require('../middlewares');

const userRoute = express();

userRoute.post('/user', validateUser, userController.createUser);

module.exports = userRoute;