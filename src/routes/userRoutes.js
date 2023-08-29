import express from 'express';
import { getCurrentUser, loginUser, registerUser } from '../controllers/userControllers.js';
import validateTokenHandler from '../middleware/validateTokenHandler.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/current', validateTokenHandler, getCurrentUser);

export default userRouter;
