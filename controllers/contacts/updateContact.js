const createError = require("http-errors");
const { Contact } = require("../../models");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
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

module.exports = updateContact;
