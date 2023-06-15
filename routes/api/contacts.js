const express = require("express");

const { validation, ctrlWrapper } = require("../../middleware");

const { contactSchema } = require("../../schemas");
const validateMiddleware = validation(contactSchema);

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getContactsById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateContact));

module.exports = router;
