const mongoose = require('mongoose');
const Note = require('./schemas/note');


class Database {
    constructor() {
        this.Url = process.env.MONGO_URL;
    }

    connect() {
        mongoose.connect(this.Url)
            .then(() => {
                console.log('Database connection established successfully');
            }).catch((err) => {
                console.error('Database connection error:', err);
            });
    }

    add(note) {
        const newNote = new Note({
            title: note.title,
            content: note.content,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return new Promise((resolve, reject) => {
            newNote.save()
                .then((doc) => {
                    console.log(`Note added successfully: ${doc}`);
                    resolve(doc);
                })
                .catch((err) => {
                    console.error('Error adding note:', err);
                    reject(err);
                });
        })
    }

    getNotes() {
        return new Promise((resolve, reject) => {
            Note.find({})
                .then((notes) => {
                    console.log(`Retrieved notes: ${notes}`);
                    resolve(notes);
                })
                .catch((err) => {
                    console.error('Error retrieving notes:', err);
                    reject([]);
                });
        });
    }

    getNoteById(id) {
        return new Promise((resolve, reject) => {
            Note.findById(id)
                .then((note) => {
                    if (note) {
                        console.log(`Retrieved note: ${note}`);
                        resolve(note);
                    } else {
                        console.log(`No note found with id: ${id}`);
                        resolve(null);
                    }
                })
                .catch((err) => {
                    console.error('Error retrieving note by ID:', err);
                    reject(err);
                });
        });
    }

    updateNote(note) {
        return new Promise((resolve, reject) => {
            const updateFields = {};
            if (note.title) {
                updateFields.title = note.title;
            }
            if (note.content) {
                updateFields.content = note.content;
            }
            updateFields.updatedAt = new Date();

            Note.findByIdAndUpdate(note["_id"], updateFields).then((updatedNote) => {
                if (updatedNote) {
                    console.log(`Note updated successfully: ${updatedNote}`);
                    resolve(updatedNote);
                } else {
                    console.log(`No note found with id: ${note["_id"]}`);
                    resolve(null);
                }
            }).catch((err) => {
                console.error('Error updating note:', err);
                reject(err);
            });
        });

    }

    deleteNote(id) {
        return new Promise((resolve, reject) => {
            Note.findByIdAndDelete(id).then((deletedNote) => {
                if (deletedNote) {
                    console.log(`Note deleted successfully: ${deletedNote}`);
                    resolve(deletedNote);
                } else {
                    console.log(`No note found with id: ${id}`);
                    resolve(null);
                }
            }).catch((err) => {
                console.error('Error deleting note:', err);
                reject(err);
            });
        })
    }

    getNotesByTitle(title) {
        return new Promise((resolve, reject) => {
            const query = { title: { $regex: new RegExp(title, 'i') } }; // Case-insensitive search
            Note.find(query).then((note) => {
                if (note) {
                    console.log(`Note deleted successfully: ${note}`);
                    resolve(note);
                } else {
                    console.log(`No note found with id: ${id}`);
                    resolve(null);
                }
            }).catch((err) => {
                console.error('Error deleting note:', err);
                reject(err);
            });
        })
    }

}

module.exports = Database;