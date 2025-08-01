import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import connectDB from './config/database.js';
import { getEnv } from './config/env.js';
import noteRoutes from './features/notes/notes.routes.js';
import userRoutes from './features/user/user.routes.js';

const app = express();

// Connect to database
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Main page
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Notes API</h1>');
});

// Routes
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

const PORT = getEnv('PORT') || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ...`);
});

export default app;
