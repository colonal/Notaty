import ClientError from '../../utils/errors/client_error.js';
import noteRepository from './notes.repository.js';

class NoteService {
    async createNote(userId, note) {
        const newNote = await noteRepository.add(userId, note);
        if (!newNote) {
            throw new ClientError('Failed to create note', 500);
        }
        return newNote;
    }

    async getAllNotes(userId, query) {
        if (query.title) {
            return noteRepository.getNotesByTitle(userId, query.title);
        }
        return noteRepository.getNotes(userId);
    }

    async getNoteById(userId, id) {
        const note = await noteRepository.getNoteById(userId, id);
        if (!note) {
            throw new ClientError('Note not found', 404);
        }
        if (userId !== note.userId) {
            throw new ClientError('You are not authorized to access this note', 403);
        }
        return noteRepository.getNoteById(userId, id);
    }

    async updateNote(userId, note) {
        const updatedNote = await noteRepository.updateNote(userId, note);
        if (!updatedNote) {
            throw new ClientError('Note not found', 404);
        }
        if (userId !== updatedNote.userId) {
            throw new ClientError('You are not authorized to update this note', 403);
        }
        return updatedNote;
    }

    async deleteNote(userId, id) {
        const deletedNote = await noteRepository.deleteNote(userId, id);
        if (!deletedNote) {
            throw new ClientError('Note not found', 404);
        }
        if (userId !== deletedNote.userId) {
            throw new ClientError('You are not authorized to delete this note', 403);
        }
        return deletedNote;
    }
}

export default new NoteService();
