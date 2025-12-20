const express = require('express')
const viewsPath = require('../../utils/viewsPath')
const homeRouter = express.Router()

homeRouter.get('', (req, res) => {
    res.sendFile(viewsPath() + 'index.html')
})

module.exports = homeRouter
