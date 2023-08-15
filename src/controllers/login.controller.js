const { loginService } = require('../services');

const ERROR_MSG = 'Internal Server Error';

const login = async (req, res) => {
  try {
     const { email, password } = req.body;
    const token = await loginService.login(email, password);

    if (!token.message) {
      return res.status(200).json({ token });
    }
    return res.status(400).json({ message: token.message });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MSG });
  }
};

module.exports = { login };
