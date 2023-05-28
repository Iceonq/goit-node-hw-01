const fs = require("fs");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  const contacts = JSON.parse(fs.readFileSync(contactsPath));
  console.table(contacts);
  return contacts;
}

function getContactById(contactId) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath));
  const contactById = contacts.find((contact) => contact.id === contactId);
  return console.log(contactById);
}

function removeContact(contactId) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath));
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  fs.writeFileSync(contactsPath, JSON.stringify(filteredContacts));
  return filteredContacts;
}

function addContact(name, email, phone) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath));
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  contacts.push(newContact);

  fs.writeFileSync(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
