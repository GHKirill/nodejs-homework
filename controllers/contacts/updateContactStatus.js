// const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const { Contact } = require("../../models");

const updateContactStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: { favorite },
    },
    { new: true }
  );
  if (!result) {
    throw createError(404, `Contact with id = ${contactId} is not found `);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContactStatus;
