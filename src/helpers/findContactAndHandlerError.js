import Contact from '../models/contactModel.js';

export const findContactAndHandleError = async (req, res) => {
	const contact = await Contact.findById(req.params.id);

	if (!contact) {
		res.status(404);
		throw new Error('Contact not found');
	}

	if (req.user.id !== String(contact.user_id)) {
		res.status(403);
		throw new Error("You are forbidden from accessing another user's contact");
	}

	return contact;
};
