const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const validateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const token = authorization.startsWith('Bearer') ? authorization.split(' ')[1] : authorization;
    const data = jwt.verify(token, JWT_SECRET);
    req.userId = data.userId;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;