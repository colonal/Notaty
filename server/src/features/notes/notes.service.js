import noteRepository from './notes.repository.js';

class NoteService {
    async createNote(note) {
        return noteRepository.add(note);
    }

    async getAllNotes(query) {
        if (query.title) {
            return noteRepository.getNotesByTitle(query.title);
        }
        return noteRepository.getNotes();
    }

    async getNoteById(id) {
        return noteRepository.getNoteById(id);
    }

    async updateNote(note) {
        return noteRepository.updateNote(note);
    }

    async deleteNote(id) {
        return noteRepository.deleteNote(id);
    }
}

export default new NoteService();
