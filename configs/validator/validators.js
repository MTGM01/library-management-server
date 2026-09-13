const Validator = require('fastest-validator')

const v = new Validator()

const userRegisterSchema = {
    firstName: {
        type: 'string',
        required: true,
        min: 2,
        max: 30,
    },
    lastName: {
        type: 'string',
        required: true,
        min: 2,
        max: 30,
    },
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
    category: {
        type: 'string',
        required: true,
    },
    total: {
        type: 'number',
        required: true,
    },
    $$strict: true
}

const adminAddUserSchema = {
    firstName: {
        type: 'string',
        required: true,
        min: 2,
        max: 30,
    },
    lastName: {
        type: 'string',
        required: true,
        min: 2,
        max: 30,
    },
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
    role: {
        type: 'string',
        optional: true,
        enum: ['ADMIN', 'USER'],
    },
    status: {
        type: 'string',
        optional: true,
        enum: ['ACTIVE', 'BLOCK'],
    },
    $$strict: true
}

const validateUserRegister = v.compile(userRegisterSchema)
const validateAddedBook = v.compile(addnewBookSchema)
const validateAdminAddUser = v.compile(adminAddUserSchema)

module.exports = {
    validateUserRegister,
    validateAddedBook,
    validateAdminAddUser
}
