import expressAsyncHandler from 'express-async-handler';
import Contact from '../models/contactModel.js';

const findByIdAndHandleError = async (id, res) => {
	const contact = await Contact.findById(id);

	if (!contact) {
		res.status(404);
		throw new Error('Contact not found');
	}

	return contact;
};

// @desc Get all Contacts
// @route GET /api/contacts
// @access private
export const getContacts = expressAsyncHandler(async (req, res) => {
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
export const createContact = expressAsyncHandler(async (req, res) => {
	const { name, email, phone } = req.body;

	if (!name || !email || !phone) {
		res.status(400);
		throw new Error('Please include all fields!');
	}

	const contactExistsForThisUser = await Contact.find({ user_id: req.user.id }).findOne({ phone });
	if (contactExistsForThisUser) {
		res.status(400);
		throw new Error('This contact has already been stored!');
	}

	const newContact = await Contact.create({
		phone,
		name,
		email,
		user_id: req.user.id,
	});

	res.status(201).json(newContact);
});

// @desc Get single Contact
// @route GET /api/contacts/:id
// @access private
export const getContactById = expressAsyncHandler(async (req, res) => {
	const contact = await findByIdAndHandleError(req.params.id, res);

	res.status(200).json(contact);
});

// @desc Update Contact
// @route PUT /api/contacts/:id
// @access private
export const updateContact = expressAsyncHandler(async (req, res) => {
	const contact = await findByIdAndHandleError(req.params.id, res);

	if (contact.user_id.toString() !== req.user.id) {
		res.status(403);
		throw new Error("You are forbidden to update another user's contact");
	}

	const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

	res.status(200).json({ updatedContact, message: 'Contact updated successfully!' });
});

// @desc Delete Contact
// @route DELETE /api/contacts/:id
// @access private
export const deleteContact = expressAsyncHandler(async (req, res) => {
	const contact = await findByIdAndHandleError(req.params.id, res);

	if (contact.user_id.toString() !== req.user.id) {
		res.status(403);
		throw new Error("You are forbidden from updating another user's contact");
	}

	const deletedContact = await Contact.findByIdAndDelete(req.params.id);

	res.status(200).json({ deletedContact, message: 'Contact deleted successfully!' });
});
