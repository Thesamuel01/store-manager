const joi = require('joi');

const schema = joi.object({
  name: joi.string().min(5).required().messages({
    'any.empty': '"name" is required',
    'string.min': '"name" length must be at least 5 characters long',
  }),
});

const validate = (name) => schema.validate(name);

module.exports = {
  validate,
};