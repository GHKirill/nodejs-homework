const createError = require("http-errors");

const validation = (schema) => {
  return (req, res, next) => {
    const body = req.body;
    const bodyFields = Object.keys(body);
    const essentialBodyFields = ["name", "email", "phone"];
    const resultBodyError = essentialBodyFields.filter(
      (item) => !bodyFields.includes(item)
    );
    if (resultBodyError.length > 0) {
      const newError = createError(
        400,
        `missing required fields: ${resultBodyError.join(", ")} `
      );
      next(newError);
    }
    const { error } = schema.validate(body);
    if (error) {
      const errorField = error.message.split(" ");
      const idx = errorField.findIndex((item) => item === "fails");
      const showErrorField = errorField.slice(0, idx).join(" ");
      const newError = createError(400, `field ${showErrorField} is not valid`);
      next(newError);
    }
    next();
  };
};

module.exports = validation;
