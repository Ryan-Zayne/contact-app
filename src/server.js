import colors from '@colors/colors';
import express from 'express';
import connectToDB from './config/connectToDB.js';
import errorHandler from './middleware/errorHandler.js';
import contactRouter from './routes/contactRoutes.js';
import userRouter from './routes/userRoutes.js';

colors.enable();

const port = process.env.PORT ?? 5001;

// Connect to DataBase
connectToDB();

// Express app instance
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);

// Error handler
app.use(errorHandler);

// Listening for server
app.listen(port, () => console.log(`Server listening on port ${port}`));
