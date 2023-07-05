const ctrlWrapper = require("./ctrlWrapper");
const validationBody = require("./validationBody");
const validationStatus = require("./validationStatus");
const validationUserBody = require("./validationUserBody");
const auth = require("./auth");
const upload = require("./upload");

module.exports = {
  validationBody,
  validationStatus,
  validationUserBody,
  ctrlWrapper,
  auth,
  upload,
};
