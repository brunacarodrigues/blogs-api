const { schemaUserValidate } = require('./schemas');

// const validateUser = (req, res, next) => {
//   const { displayName, email, password } = req.body;
//   const { userInvalid } = schemaUserValidate.validate({ displayName, email, password });

//   if (userInvalid) {
//     return res.status(400).json({ message: userInvalid.message });
//   }

//   next();
// };

const validateUser = (req, res, next) => {
  // const userData = req.body;
  const { displayName, email, password } = req.body;

  const { error } = schemaUserValidate.validate({ displayName, email, password });

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = validateUser;