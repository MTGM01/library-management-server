const path = require('path')

module.exports = () => {
    return path.join(process.cwd(), 'views')
}