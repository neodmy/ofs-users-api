const Joi = require('@hapi/joi');

const signinSchema = Joi.object({
  nickname: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = signinSchema;
