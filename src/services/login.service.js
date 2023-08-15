const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const login = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
        return { status: 400, message: 'Invalid fields' };
    }
    const token = jwt.sign(email, JWT_SECRET, { algorithm: 'HS256' });
    return token;
};

module.exports = {
    login,
};