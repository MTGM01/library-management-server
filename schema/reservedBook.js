const mongoose = require('mongoose')

const reservedBookSchema = {
    userID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "users"
    },
    bookID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "books"
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
}

module.exports = mongoose.model("reserved_books", reservedBookSchema)
