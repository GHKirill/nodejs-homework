const express = require("express");

const { ctrlWrapper, auth, upload } = require("../../middleware");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch("/", auth, ctrlWrapper(ctrl.subscriptionChange));

router.patch(
  "/avatar",
  auth,
  upload().single("avatar"),
  ctrlWrapper(ctrl.avatarUpdate)
);
module.exports = router;
