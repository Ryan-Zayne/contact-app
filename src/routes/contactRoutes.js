import express from 'express';
import {
	createContact,
	deleteContact,
	getContactById,
	getContacts,
	updateContact,
} from '../controllers/contactControllers.js';
import authenticateUser from '../middleware/authenticateUser.middleware.js';

const contactRouter = express.Router();

// Token Validation middleware applied to all contact routes
contactRouter.use(authenticateUser);

// Routes
contactRouter.route('/').get(getContacts).post(createContact);
contactRouter.route('/:id').get(getContactById).put(updateContact).delete(deleteContact);

export default contactRouter;
