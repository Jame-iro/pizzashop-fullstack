const Joi = require("joi");

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().allow(""),
    price: Joi.number().precision(2).positive().required(),
    rating: Joi.number().min(0).max(10).precision(2),
    image_url: Joi.string().uri().allow(""),
    ingredients: Joi.string().allow(""),
    is_popular: Joi.boolean(),
    category_id: Joi.number().integer().required(),
  });

  return schema.validate(product);
};

module.exports = { validateProduct };
