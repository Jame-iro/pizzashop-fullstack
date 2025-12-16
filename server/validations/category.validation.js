const Joi = require("joi");

const validateCategory = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    display_order: Joi.number().integer().min(0),
  });

  return schema.validate(category);
};

module.exports = { validateCategory };
