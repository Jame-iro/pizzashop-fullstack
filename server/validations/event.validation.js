const Joi = require("joi");

const validateEvent = (event) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().allow(""),
    image_url: Joi.string().uri().allow(""),
    button_text: Joi.string().allow("").default("More"),
    start_date: Joi.date().allow(null),
    end_date: Joi.date().allow(null),
    is_active: Joi.boolean().default(true),
  });

  return schema.validate(event);
};

module.exports = { validateEvent };
