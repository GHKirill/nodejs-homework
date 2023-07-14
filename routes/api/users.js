const express = require("express");
const joiSchema = require("../../models/user");
const {
  ctrlWrapper,
  auth,
  upload,
  validationBodyEmail,
} = require("../../middleware");
const { users: ctrl } = require("../../controllers");

const validateBodyEmailMiddleware = validationBodyEmail(joiSchema);

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch("/", auth, ctrlWrapper(ctrl.subscriptionChange));

router.patch(
  "/avatar",
  auth,
  upload().single("avatar"),
  ctrlWrapper(ctrl.avatarUpdate)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validateBodyEmailMiddleware,
  ctrlWrapper(ctrl.verifyEmailNext)
);
module.exports = router;
