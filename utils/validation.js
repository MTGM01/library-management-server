const Validator = require('fastest-validator')

const v = new Validator()

const schema = {
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

const registerValidator = v.compile(schema)

module.exports = {
    registerValidator
}
