import express from 'express';
import {
	createContact,
	deleteContact,
	getContactById,
	getContacts,
	updateContact,
} from '../controllers/contactControllers.js';

const contactRouter = express.Router();

contactRouter.get('/', getContacts);

contactRouter.post('/', createContact);

contactRouter.get('/:id', getContactById);

contactRouter.put('/:id', updateContact);

contactRouter.delete('/:id', deleteContact);

export default contactRouter;
