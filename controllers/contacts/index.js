const getAll = require("./getAll");
const getContactsById = require("./getContactById");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateContactStatus = require("./updateContactStatus");

module.exports = {
  getAll,
  getContactsById,
  addContact,
  deleteContact,
  updateContact,
  updateContactStatus,
};
