const express = require("express");
const { auth: ctrl } = require("../../controllers");
const router = express.Router();

const {
  ctrlWrapper,
  validationUserBody,
  auth,
} = require("../../middleware");

const { joiUserSchema } = require("../../models");

router.post(
  "/signup",
  validationUserBody(joiUserSchema),
  ctrlWrapper(ctrl.signup)
);
router.post(
  "/login",
  validationUserBody(joiUserSchema),
  ctrlWrapper(ctrl.login)
);

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
