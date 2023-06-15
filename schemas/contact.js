const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .regex(
      /^[A-Z]{1}[a-z]{1,20}([\s-][A-Z]{1}[a-z]{1,20})?\s[A-Z]{1}[a-z]{1,20}(-[A-Z]{1}[a-z]{1,20})?$/
    )
    .required(),
  email: Joi.string()
    .regex(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)
    .required(),
  phone: Joi.string()
    .regex(/^\(?\d{3}\)?\s?\d{3}\s?-?\d{4}$/)
    .required(),
});

module.exports = contactSchema;
