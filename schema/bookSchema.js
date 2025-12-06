const mongoose = require('mongoose')

const bookSchema = {
    title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20,
        default: 'guest_user'
    },
    author: {
        type: String,
        required: true,
        minLength: 8
    },
    price: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 13
    },
    isReserved: {
        type: Number,
        required: true,
        default: 0,
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

module.exports = mongoose.model("books", bookSchema)
