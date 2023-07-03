const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");

const nameRegExp =
  /^[A-Z]{1}[a-z]{1,20}([\s-][A-Z]{1}[a-z]{1,20})?\s[A-Z]{1}[a-z]{1,20}(-[A-Z]{1}[a-z]{1,20})?$/;
const emailRegExp =
  /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const phoneRegExp = /^\(?\d{3}\)?\s?\d{3}\s?-?\d{4}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
  },

  { versionKey: false }
);

const joiSchema = Joi.object({
  name: Joi.string().required().pattern(nameRegExp),
  email: Joi.string().required().pattern(emailRegExp),
  phone: Joi.string().required().pattern(phoneRegExp),
  favorite: Joi.bool(),
});
const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema, favoriteJoiSchema };
