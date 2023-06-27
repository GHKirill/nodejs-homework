const express = require("express");

const { ctrlWrapper, auth } = require("../../middleware");
const { users: ctrl } = require("../../controllers");

const route = express.Router();

route.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
route.patch("/", auth, ctrlWrapper(ctrl.subscriptionChange));
module.exports = route;
