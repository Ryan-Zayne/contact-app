import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc Register a User
// @route POST /api/users/register
// @access public
export const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

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
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const newUser = await User.create({
		username,
		email,
		password: hashedPassword,
	});

	if (!newUser) {
		res.status(400);
		throw new Error('User data is not valid');
	}

	res.status(201).json({
		_id: newUser.id,
		email: newUser.email,
	});
});

// @desc Login User
// @route POST /api/users/login
// @access public
export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error('All fields are mandatory!');
	}

	// Comparing password with hashedPassword in database
	const user = await User.findOne({ email });
	const isValidPassword = Boolean(user && (await bcrypt.compare(password, user.password)));

	if (!isValidPassword) {
		res.status(401);
		throw new Error('Email or password is invalid');
	}

	const accessToken = jwt.sign(
		{
			user: {
				username: user.username,
				email: user.email,
				id: user.id,
			},
		},
		process.env.JWT_SECRET,
		{ expiresIn: '30m' }
	);

	res.status(200).json({ accessToken });
});

// @desc Get current User Info
// @route GET /api/users/current
// @access private
export const getCurrentUser = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});
