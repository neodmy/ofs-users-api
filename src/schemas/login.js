const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = loginSchema;
