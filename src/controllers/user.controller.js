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

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

const getByIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getByIdUser(id);

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

const deleteByIdUser = async (req, res) => {
  try {
    const { userId } = req;

    const user = await userService.deleteByIdUser(userId);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(204).json(user);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getByIdUser,
  deleteByIdUser,
};