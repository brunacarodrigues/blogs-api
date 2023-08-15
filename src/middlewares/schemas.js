const Joi = require('joi');

const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const schemaUserValidate = Joi.object({
  displayName: Joi.string().min(8)
    .message('"displayName" length must be at least 8 characters long').required(),
  email: Joi.string().regex(regexEmail).message('"email" must be a valid email').required(),
  password: Joi.string().min(6)
    .message('"password" length must be at least 6 characters long').required(),
  image: Joi.string(),
});

module.exports = {
    schemaUserValidate,
};