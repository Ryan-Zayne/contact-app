import express from 'express';
import { getCurrentUser, loginUser, registerUser } from '../controllers/userControllers.js';
import authenticateUser from '../middleware/authenticateUser.middleware.js';

const userRouter = express.Router();

// Regular Routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Token Validation middleware applied for only this route
userRouter.get('/current', authenticateUser, getCurrentUser);

export default userRouter;
