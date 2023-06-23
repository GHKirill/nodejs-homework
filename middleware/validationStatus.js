const createError = require("http-errors");

const validationStatus = (schema) => {
  return (req, res, next) => {
    const body = req.body;
    if (!body || !Object.keys(body).includes("favorite")) {
      const newError = createError(400, "missing field favorite");
      next(newError);
    }
    const { error } = schema.validate(body);
    if (error) {
      const newError = createError(
        400,
        `field "favorite" should be only "true" or "false"`
      );
      next(newError);
    }
    next();
  };
};
module.exports = validationStatus;
