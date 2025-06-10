const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const noteRoutes = require('./features/notes/notes.routes');

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ...`);
});

module.exports = app;
