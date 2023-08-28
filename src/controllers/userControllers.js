import bcrypt from 'bcrypt';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc Register a User
// @route POST /api/users/register
// @access public
export const registerUser = expressAsyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	// Ensuring all fields are present
	if (!username || !email || !password) {
		res.status(400);
		throw new Error('All fields are mandatory!');
	}

	// Checking if user already exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('User already registered!');
	}

	// Hashing the password
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = await User.create({
		username,
		email,
		password: hashedPassword,
	});

	if (newUser) {
		res.status(201).json({
			_id: newUser.id,
			email: newUser.email,
		});
	} else {
		res.status(400);
		throw new Error('User data is not valid!');
	}
});

// @desc Login User
// @route POST /api/users/login
// @access public
export const loginUser = expressAsyncHandler(async (req, res) => {
	res.status(200).json({ message: 'Login user' });
});

// @desc Get current User Info
// @route GET /api/users/current
// @access private
export const getCurrentUser = expressAsyncHandler(async (req, res) => {
	res.status(200).json({ message: 'Current user information' });
});
