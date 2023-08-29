import express from 'express';
import { getCurrentUser, loginUser, registerUser } from '../controllers/userControllers.js';
import validateTokenHandler from '../middleware/validateTokenHandler.js';

const userRouter = express.Router();

// Regular Routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Token Validation middleware is used for only this route
userRouter.get('/current', validateTokenHandler, getCurrentUser);

export default userRouter;
