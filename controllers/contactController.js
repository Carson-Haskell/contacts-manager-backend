const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact");

/**
@desc Get all contacts
@route /api/contacts
@method GET
@access Public
*/
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();

  if (!contacts.length) {
    res.status(200).json({ message: "No contacts found" });
  }

  res.status(200).json(contacts);
});

/**
 @desc Create New contact
 @route /api/contacts
 @method POST
 @access Public
 */
const postContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone
  });

  res.status(201).json(contact);
});

/**
@desc Get contact
@route /api/contacts/:id
@method GET
@access Public
*/
const getContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);

    res.status(200).json(contact);
  } catch (error) {
    res.status(404);
    throw new Error("Contact not found");
  }
});

/**
@desc Update contact
@route /api/contacts/:id
@method PUT
@access Public
*/
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // check if contact exists before updating
    await Contact.findById(id);

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true
    });

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(404);
    throw new Error("Contact not found");
  }
});

/**
@desc Delete contact
@route /api/contacts/:id
@method DELETE
@access Public
*/
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // check if contact exists before deleting
    const contact = await Contact.findById(id);

    await Contact.deleteOne({ _id: id });
    res.status(200).json({ message: `Contact ${contact.name} deleted` });
  } catch (error) {
    res.status(404);
    throw new Error("Contact not found");
  }
});

module.exports = {
  getContacts,
  postContact,
  getContact,
  updateContact,
  deleteContact
};
