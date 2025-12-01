const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20,
        default: 'guest_user'
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
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.models.users || mongoose.model("users", userSchema)
