const noteService = require('./notes.service');

class NoteController {
    async createNote(req, res) {
        try {
            const note = await noteService.createNote(req.body);
            res.status(201).json({
                message: 'Note created successfully',
                success: true,
                note: note
            });
        } catch (error) {
            console.error('Error creating note:', error);
            res.status(500).json({
                message: 'Error creating note',
                success: false
            });
        }
    }

    async getAllNotes(req, res) {
        try {
            const notes = await noteService.getAllNotes(req.query);
            res.status(200).json({
                message: 'Notes retrieved successfully',
                success: true,
                notes: notes
            });
        } catch (error) {
            console.error('Error retrieving notes:', error);
            res.status(500).json({
                message: 'Error retrieving notes',
                success: false,
                notes: []
            });
        }
    }

    async getNoteById(req, res) {
        try {
            const note = await noteService.getNoteById(req.params.id);
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
        } catch (error) {
            console.error('Error retrieving note by ID:', error);
            res.status(500).json({
                message: 'Error retrieving note',
                success: false,
                note: null
            });
        }
    }

    async updateNote(req, res) {
        try {
            const note = await noteService.updateNote(req.body);
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
        } catch (error) {
            console.error('Error updating note:', error);
            res.status(500).json({
                message: 'Error updating note',
                success: false,
                note: null
            });
        }
    }

    async deleteNote(req, res) {
        try {
            const result = await noteService.deleteNote(req.params.id);
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
        } catch (error) {
            console.error('Error deleting note:', error);
            res.status(500).json({
                message: 'Error deleting note',
                success: false
            });
        }
    }
}

module.exports = new NoteController();
