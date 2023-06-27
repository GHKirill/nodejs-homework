const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const emailRegExp =
  /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const passwordRegExp = /^[a-zA-Z0-9_.-/]{6,20}$/;

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegExp,
    },
    password: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 6,
    },

    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.setToken = function (token) {
  this.token = token;
};

const joiUserSchema = Joi.object({
  password: Joi.string().required().pattern(passwordRegExp),
  email: Joi.string().required().pattern(emailRegExp),
  // subscription: Joi.String().allow("starter", "pro", "business"),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const User = model("user", userSchema);

module.exports = { User, joiUserSchema };
