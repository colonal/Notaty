import Note from './notes.model.js';

class NoteRepository {
    async add(userId, note) {
        const newNote = new Note({
            title: note.title,
            content: note.content,
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return newNote.save();
    }

    async getNotes(userId) {
        return Note.find({ userId: userId });
    }

    async getNoteById(userId, id) {
        return Note.findOne({ _id: id, userId: userId });
    }

    async updateNote(userId, note) {
        const updateFields = {};
        if (note.title) {
            updateFields.title = note.title;
        }
        if (note.content) {
            updateFields.content = note.content;
        }
        updateFields.updatedAt = new Date();

        return Note.findOneAndUpdate({ _id: note["_id"], userId: userId }, updateFields, { new: true });
    }

    async deleteNote(userId, id) {
        return Note.findOneAndDelete({ _id: id, userId: userId });
    }

    async getNotesByTitle(userId, title) {
        const query = { title: { $regex: new RegExp(title, 'i') }, userId: userId }; // Case-insensitive search
        return Note.find(query);
    }
}

export default new NoteRepository();
