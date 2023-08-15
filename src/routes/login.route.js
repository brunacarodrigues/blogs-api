const express = require('express');
const { loginController } = require('../controllers');
const { validateLogin } = require('../middlewares');

const loginRoute = express();

loginRoute.post('/login', validateLogin, loginController.login);

module.exports = loginRoute;