const express = require('express');
const router = express.Router();
const noteController = require('./notes.controller');

// Create POST API to be able to create a new note
router.post('/', noteController.createNote);

// Create GET API to be able to retrieve all notes
router.get('/', noteController.getAllNotes);

// Create GET API to be able to retrieve a note by ID
router.get('/:id', noteController.getNoteById);

// Create PUT API to be able to update a note
router.put('/', noteController.updateNote);

// Create DELETE API to be able to delete a note
router.delete('/:id', noteController.deleteNote);

module.exports = router;
