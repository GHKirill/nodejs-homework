const fs = require("fs/promises");
const { v4 } = require("uuid");

const contactsPath = require("./filePath");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return await JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  console.log(contactId);
  const idx = await allContacts.findIndex((item) => item.id === contactId);
  if (!idx) {
    return null;
  }
  const updatedContacts = await allContacts.filter(
    (item) => item.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return allContacts[idx];
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = { id: v4(), ...body };
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const contact = await allContacts.find((item) => item.id === contactId);
  if (!contact) return null;
  const updateContact = { ...contact, ...body };
  const updateContacts = await allContacts.map((item) => {
    if (item.id === contactId) return updateContact;
    return item;
  });
  await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
