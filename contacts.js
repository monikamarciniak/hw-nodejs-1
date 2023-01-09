const fs = require("node:fs").promises;
const path = require("node:path");
require("colors");

const contactsPath = path.resolve("./db/contacts.json");

const fetchContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (err) {
    console.log(err.message);
  }
};

const pushContacts = async (contacts) => {
  try {
    const stringifyContacts = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, stringifyContacts);
  } catch (err) {
    console.log(err.message);
  }
};

const listContacts = async () => {
  try {
    const contacts = await fetchContacts();
    console.table(contacts);
    return;
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await fetchContacts();
    const element = contacts.find((contact) => contact.id === contactId);
    if (!element) {
      console.log(`This contact doesn't exist on the list`.brightRed);
      return;
    }
    console.log(element);
    return;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fetchContacts();
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    await pushContacts(newContacts);
    console.log("You removed contact successfully!".blue);
    return;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await fetchContacts();
    const newContact = { id: `${contacts.length + 1}`, name, email, phone };
    contacts.push(newContact);
    await pushContacts(contacts);
    console.log(
      `You added new contact (${JSON.stringify(newContact)}) successfully!`
        .brightGreen
    );
    return;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
