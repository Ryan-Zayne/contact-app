import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.utils.js';

const authenticateUser = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization ?? req.headers.Authorization;
	const isValidAuthHeader = Boolean(authHeader && authHeader.startsWith('Bearer'));

	if (!isValidAuthHeader) {
		res.status(401);
		throw new Error('Please ensure to set the authorization header!');
	}

	const { 1: encodedToken } = authHeader.split(' ');

	if (!encodedToken) {
		res.status(401);
		throw new Error('User is not authorized or token is missing');
	}

	try {
		const decodedPayload = jwt.verify(encodedToken, process.env.JWT_SECRET);
		const { userId } = decodedPayload;

		const authenticatedUser = await User.findById(userId).select('-password');

		req.user = authenticatedUser;
		next();

		// Catch error thrown by jwt.verify if user is not authorized
	} catch {
		res.status(401);
		throw new Error('User is not authorized');
	}
});

export default authenticateUser;
