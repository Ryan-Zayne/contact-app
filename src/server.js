/* eslint-disable no-console */
import '@colors/colors';
import 'dotenv/config.js';
import express from 'express';
import connectToDB from './config/connectToDB.js';
import errorHandler from './middleware/errorHandler.middleware.js';
import notFound from './middleware/notFound.middleware.js';
import contactRouter from './routes/contactRoutes.js';
import userRouter from './routes/userRoutes.js';

const port = process.env.PORT ?? 5001;

// Express app instance
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);

// Route Not Found handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Connect to DataBase
connectToDB();

// Listening for server
app.listen(port, () => console.info(`Server listening on port ${port}`));
