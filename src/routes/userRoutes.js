import express from 'express';
import {
	getCurrentUser,
	loginUser,
	registerUser,
	updateUserProfile,
} from '../controllers/userControllers.js';
import authenticateUser from '../middleware/authenticateUser.middleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.patch('/update-profile', authenticateUser, updateUserProfile);
userRouter.get('/current', authenticateUser, getCurrentUser);

export default userRouter;
