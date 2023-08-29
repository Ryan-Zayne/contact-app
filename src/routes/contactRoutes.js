import express from 'express';
import {
	createContact,
	deleteContact,
	getContactById,
	getContacts,
	updateContact,
} from '../controllers/contactControllers.js';
import validateTokenHandler from '../middleware/validateTokenHandler.js';

const contactRouter = express.Router();

contactRouter.use(validateTokenHandler);

contactRouter.route('/').get(getContacts).post(createContact);

contactRouter.route('/:id').get(getContactById).put(updateContact).delete(deleteContact);

export default contactRouter;
