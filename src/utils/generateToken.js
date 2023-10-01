import jwt from 'jsonwebtoken';

export const generateToken = (userId) => {
	const payload = { userId };

	const encodedToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' });

	jwt.sign('authHeader', '', { expiresIn: 1 });

	return encodedToken;
};
