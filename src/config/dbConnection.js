/* eslint-disable no-console */
import mongoose from 'mongoose';

const connectDB = async () => {
	// prettier-ignore
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected: ${connect.connection.host}`.cyan.italic.underline)

	} catch (error) {
		throw new Error(error);
	}
};

export default connectDB;
