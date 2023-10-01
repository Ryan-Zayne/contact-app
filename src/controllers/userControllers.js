import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.utils.js';
import { generateToken } from '../utils/generateToken.js';

// @desc Register a User
// @route POST /api/users/register
// @access public
export const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		res.status(400);
		throw new Error('All fields are mandatory!');
	}

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		res.status(400);
		throw new Error('User already registered!');
	}

	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(String(password), saltRounds);

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
		id: newUser.id,
		username: newUser.username,
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

	const user = await User.findOne({ email });
	const isValidPassword = Boolean(user && (await bcrypt.compare(String(password), user.password)));

	if (!isValidPassword) {
		res.status(401);
		throw new Error('Email or password is invalid');
	}

	const encodedToken = generateToken(user.id);

	res.json({ encodedToken });
});

// @desc Update current User Profile
// @route PATCH /api/users/update-profile
// @access private
export const updateUserProfile = asyncHandler(async (req, res) => {
	const userId = req.user.id;
	const user = await User.findById(userId);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	const { username = user.username, email = user.email, password } = req.body;

	let hashedPassword;
	if (password) {
		const saltRounds = 10;
		hashedPassword = await bcrypt.hash(String(password), saltRounds);
	}

	const updatedUser = await User.findByIdAndUpdate(
		userId,
		{ username, email, password: hashedPassword ?? user.password },
		{ new: true }
	);

	res.json({ username: updatedUser.username, email: updatedUser.email });
});

// @desc Get current User Info
// @route GET /api/users/current
// @access private
export const getCurrentUser = asyncHandler(async (req, res) => {
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	res.json(req.user);
});
