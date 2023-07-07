/* eslint-disable no-console */
import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected: ${connect.connection.host}`, connect.connection.name);
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export default connectDB;
