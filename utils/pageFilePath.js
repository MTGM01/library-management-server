const path = require('path')

module.exports = (fileName) => {
    return path.join(process.cwd(), `views/${fileName}.html`)
}