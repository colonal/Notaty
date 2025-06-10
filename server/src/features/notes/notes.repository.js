const Note = require('./notes.model');

class NoteRepository {
    async add(note) {
        const newNote = new Note({
            title: note.title,
            content: note.content,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return newNote.save();
    }

    async getNotes() {
        return Note.find({});
    }

    async getNoteById(id) {
        return Note.findById(id);
    }

    async updateNote(note) {
        const updateFields = {};
        if (note.title) {
            updateFields.title = note.title;
        }
        if (note.content) {
            updateFields.content = note.content;
        }
        updateFields.updatedAt = new Date();

        return Note.findByIdAndUpdate(note["_id"], updateFields, { new: true });
    }

    async deleteNote(id) {
        return Note.findByIdAndDelete(id);
    }

    async getNotesByTitle(title) {
        const query = { title: { $regex: new RegExp(title, 'i') } }; // Case-insensitive search
        return Note.find(query);
    }
}

module.exports = new NoteRepository();
