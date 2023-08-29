import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';

const validateTokenHandler = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization ?? req.headers.Authorization;

	if (authHeader && authHeader.startsWith('Bearer')) {
		const { 1: token } = authHeader.split(' ');

		if (!token) {
			res.status(401);
			throw new Error('User is not authorized or token is missing');
		}

		jwt.verify(token, process.env.JWT_SECRET, (err, decodedInfo) => {
			if (err) {
				res.status(401);
				throw new Error('User is not authorized');
			}

			req.user = decodedInfo.user;
			next();
		});
	}
});

export default validateTokenHandler;