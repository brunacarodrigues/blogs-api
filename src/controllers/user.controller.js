const { userService } = require('../services');

const ERROR_MSG = 'Internal Server Error';

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const token = await userService.createUser(displayName, email, password, image);

    if (!token.message) {
      return res.status(201).json({ token });
    }
    return res.status(409).json({ message: token.message });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

module.exports = {
  createUser,
};