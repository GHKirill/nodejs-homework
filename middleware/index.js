// const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
// const { validationBody, validationStatus } = require("./validation");
const validationBody = require("./validationBody");
const validationStatus = require("./validationStatus");

module.exports = {
  validationBody,
  validationStatus,
  ctrlWrapper,
};
