const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model('Note', noteSchema);