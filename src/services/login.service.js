const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const login = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
        return { status: 400, message: 'Invalid fields' };
    }
    const userId = user.dataValues.id;
    const token = jwt.sign({ email, userId }, JWT_SECRET, { algorithm: 'HS256' });
    return token;
};

module.exports = {
    login,
};