import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: {
			type: String,
			required: [true, 'Please add the contact name'],
		},
		email: {
			type: String,
			required: [true, 'Please add the contact email'],
		},
		phone: {
			type: String,
			required: [true, 'Please add the contact phone'],
		},
	},
	{ timestamps: true }
);

const Contact = model('Contact', contactSchema);

export default Contact;
