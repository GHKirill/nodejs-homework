const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw createError(404, `Contact with id = ${contactId} is not found `);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact is deleted",
    data: {
      result,
    },
  });
};

module.exports = deleteContact;
