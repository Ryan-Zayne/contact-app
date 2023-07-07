import express from 'express';
import { getCurrentUser, loginUser, registerUser } from '../controllers/userControllers.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/current', getCurrentUser);

export default userRouter;
