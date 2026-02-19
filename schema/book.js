const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    availableCount: {
        type: Number,
        required: true
    },
    ISBN: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})

module.exports = {
    booksCollection: mongoose.model("books", bookSchema),
    bookSchema
}
