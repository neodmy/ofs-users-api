const Joi = require('@hapi/joi');

const authUserSchema = Joi.object({
  _id: Joi.string().required(),
});

module.exports = authUserSchema;
