import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import noteController from './notes.controller.js';
const router = express.Router();

// Create POST API to be able to create a new note
router.post('/', authMiddleware, noteController.createNote);

// Create GET API to be able to retrieve all notes
router.get('/', authMiddleware, noteController.getAllNotes);

// Create GET API to be able to retrieve a note by ID
router.get('/:id', authMiddleware, noteController.getNoteById);

// Create PUT API to be able to update a note
router.put('/', authMiddleware, noteController.updateNote);

// Create DELETE API to be able to delete a note
router.delete('/:id', authMiddleware, noteController.deleteNote);

export default router;
