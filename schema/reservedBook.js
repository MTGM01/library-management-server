const mongoose = require('mongoose')
const { userSchema } = require('../schema/user')
const { bookSchema } = require('../schema/book')

const reservedBookSchema = {
    user: {
        type: userSchema,
        required: true
    },
    book: {
        type: bookSchema,
        required: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}

module.exports = mongoose.model("reserved_books", reservedBookSchema)
