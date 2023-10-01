import { findContactAndHandleError } from '../helpers/findContactAndHandlerError.js';
import Contact from '../models/contactModel.js';
import asyncHandler from '../utils/asyncHandler.utils.js';

// @desc Get all Contacts
// @route GET /api/contacts
// @access private
export const getContacts = asyncHandler(async (req, res) => {
	const contacts = await Contact.find({ user_id: req.user.id });

	if (contacts.length === 0) {
		res.status(404);
		throw new Error('Contacts not found');
	}

	res.status(200).json(contacts);
});

// @desc Create a new Contact
// @route POST /api/contacts
// @access private
export const createContact = asyncHandler(async (req, res) => {
	const { name, email, phone } = req.body;

	if (!name || !email || !phone) {
		res.status(400);
		throw new Error('Please include all fields!');
	}

	const existingContact = await Contact.find({ user_id: req.user.id }).findOne({ phone });

	if (existingContact) {
		res.status(400);
		throw new Error('This contact has already been stored!');
	}

	const newContact = await Contact.create({
		user_id: req.user.id,
		phone,
		name,
		email,
	});

	res.status(201).json(newContact);
});

// @desc Get single Contact
// @route GET /api/contacts/:id
// @access private
export const getContactById = asyncHandler(async (req, res) => {
	const contact = await findContactAndHandleError(req, res);

	res.status(200).json(contact);
});

// @desc Update Contact
// @route PATCH /api/contacts/:id
// @access private
export const updateContact = asyncHandler(async (req, res) => {
	findContactAndHandleError(req, res);

	const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

	res.status(200).json({ updatedContact, message: 'Contact updated successfully!' });
});

// @desc Delete Contact
// @route DELETE /api/contacts/:id
// @access private
export const deleteContact = asyncHandler(async (req, res) => {
	findContactAndHandleError(req, res);

	const deletedContact = await Contact.findByIdAndDelete(req.params.id);

	res.status(200).json({ deletedContact, message: 'Contact deleted successfully!' });
});
