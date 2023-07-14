const createError = require("http-errors");

const validationBodyEmail = (schema) => {
  return (req, res, next) => {
    const body = req.body;

    if (
      !body ||
      !Object.keys(body).includes("email") ||
      Object.keys(body).length > 1
    ) {
      const newError = createError(
        400,
        "missing field email or body is invalid"
      );
      next(newError);
    }
    const { error } = schema.validate(body);
    if (error) {
      console.log(error);
      const newError = createError(400, `field "email" is invalid`);
      next(newError);
    }
    next();
  };
};
module.exports = validationBodyEmail;
