const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
    },
    userName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20,
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    mobile: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 13
    },
    crime: {
        type: Number,
        required: true,
        default: 0,
    },
    role: {
        type: String,
        required: true,
    },
    reservedBooks: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'books'
        }
    ],
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'BLOCK'],
        default: 'ACTIVE'
    }
})

module.exports = {
    usersCollection: mongoose.model("users", userSchema),
    userSchema
}
