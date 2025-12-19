const omitEmpty = require('omit-empty')

module.exports = function removeEmptyProperties(options) {
    return (req, res, next) => {
        req.body = omitEmpty(req.body, options)
        req.params = omitEmpty(req.params)
        req.query = omitEmpty(req.query)
        next()
    }
}