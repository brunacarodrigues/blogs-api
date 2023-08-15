const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const createUser = async (displayName, email, password, image) => {
  try {
    const newUser = image
      ? { displayName, email, password, image }
      : { displayName, email, password };

      await User.create(newUser);
      const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
      return token;
  } catch (error) {
    return { message: 'User already registered' };
  }
};

const getAllUsers = async () => User.findAll({ attributes: { exclude: ['password'] } });

const getByIdUser = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  return user || null;
};

module.exports = {
  createUser,
  getAllUsers,
  getByIdUser,
};