const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const {
  validationBody,
  validationStatus,
  ctrlWrapper,
} = require("../../middleware");

const { joiSchema, favoriteJoiSchema } = require("../../models");
const validateBodyMiddleware = validationBody(joiSchema);
const validateStatusMiddleware = validationStatus(favoriteJoiSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getContactsById));

router.post("/", validateBodyMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

router.put(
  "/:contactId",
  validateBodyMiddleware,
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validateStatusMiddleware,
  ctrlWrapper(ctrl.updateContactStatus)
);

module.exports = router;
