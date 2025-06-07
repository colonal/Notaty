const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const Database = require('./Database');
const db = new Database();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Main page
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Notes API</h1>');
});

// Create POST API to be able to create a new note
app.post('/api/notes', (req, res) => {
    const body = req.body;
    console.log('Received note:', body.title);


    db.add(body).then((result) => {
        res.status(201).json({
            message: 'Note created successfully',
            success: true,
            note: result
        });
    }, (error) => {
        console.error('Error creating note:', error);
        res.status(500).json({
            message: 'Error creating note',
            success: false
        });
    });
})

// Create GET API to be able to retrieve all notes
app.get('/api/notes', (req, res) => {
    console.log('Retrieving all notes');
    const { title } = req.query;
    if (title) {
        db.getNotesByTitle(title).then((notes) => {
            res.status(200).json({
                message: 'Notes retrieved successfully',
                success: true,
                notes: notes
            });
        }, (error) => {
            console.error('Error retrieving notes:', error);
            res.status(500).json({
                message: 'Error retrieving notes',
                success: false,
                notes: []
            });
        });
    } else {
        db.getNotes().then((notes) => {
            res.status(200).json({
                message: 'Notes retrieved successfully',
                success: true,
                notes: notes
            });
        }, (error) => {
            console.error('Error retrieving notes:', error);
            res.status(500).json({
                message: 'Error retrieving notes',
                success: false,
                notes: []
            });
        });
    }


})

// Create GET API to be able to retrieve a note by ID
app.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Retrieving note with ID: ${id}`);

    db.getNoteById(id).then((note) => {
        if (note) {
            res.status(200).json({
                message: 'Note retrieved successfully',
                success: true,
                note: note
            });
        } else {
            res.status(404).json({
                message: 'Note not found',
                success: false,
                note: null
            });
        }
    }, (error) => {
        console.error('Error retrieving note by ID:', error);
        res.status(500).json({
            message: 'Error retrieving note',
            success: false,
            note: null
        });
    });
})

// Create PUT API to be able to update a note
app.put('/api/notes', (req, res) => {

    const body = req.body;
    db.updateNote(body).then((note) => {
        if (note) {
            res.status(200).json({
                message: 'Note updated successfully',
                success: true,
                note: note
            });
        } else {
            res.status(404).json({
                message: 'Note not found',
                success: false,
                note: null
            });
        }
    }, (error) => {
        console.error('Error retrieving note by ID:', error);
        res.status(500).json({
            message: 'Error retrieving note',
            success: false,
            note: null
        });
    });
})

// Create DELETE API to be able to delete a note
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Deleting note with ID: ${id}`);

    db.deleteNote(id).then((result) => {
        if (result) {
            res.status(200).json({
                message: 'Note deleted successfully',
                success: true
            });
        } else {
            res.status(404).json({
                message: 'Note not found',
                success: false
            });
        }
    }, (error) => {
        console.error('Error deleting note:', error);
        res.status(500).json({
            message: 'Error deleting note',
            success: false
        });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ...`);
    db.connect();
});