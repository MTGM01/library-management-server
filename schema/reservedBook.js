const mongoose = require('mongoose')

const reservedBookSchema = {
    userID: {
        type: String,
        required: true,
    },
    bookID: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    }
}

module.exports = mongoose.model("reserved_books", reservedBookSchema)
