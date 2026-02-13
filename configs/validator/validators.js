const Validator = require('fastest-validator')

const v = new Validator()

const userRegisterSchema = {
    userName: {
        type: 'string',
        required: true,
        min: 5,
        max: 20,
    },
    password: {
        type: 'string',
        required: true,
        min: 8
    },
    mobile: {
        type: 'string',
        required: true,
        min: 9,
        max: 13
    },
    confirmPassword: {
        type: 'equal',
        field: 'password',
    },
    $$strict: true
}

const addnewBookSchema = {
    title: {
        type: 'string',
        required: true,
    },
    author: {
        type: 'string',
        required: true,
    },
    ISBN: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string',
        required: false,
    },
    $$strict: true
}

const validateUserRegister = v.compile(userRegisterSchema)
const validateAddedBook = v.compile(addnewBookSchema)

module.exports = {
    validateUserRegister,
    validateAddedBook
}
