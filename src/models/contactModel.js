import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
});

const Contact = model('Contact', contactSchema);

export default Contact;
