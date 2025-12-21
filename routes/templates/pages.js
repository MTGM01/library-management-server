const express = require('express')
const viewsPath = require('../../utils/pageFilePath')
const pagesRouter = express.Router()

pagesRouter.get('', (req, res) => {
    res.sendFile(viewsPath('index'))
})

pagesRouter.get('/aboutUs', (req, res) => {
    res.sendFile(viewsPath('aboutUs'))
})

pagesRouter.get('/contactUs', (req, res) => {
    res.sendFile(viewsPath('contactUs'))
})

pagesRouter.use((req, res) => {
    // res.sendFile(viewsPath('404'))
    res.status(404).json({ data: { message: 'page not Found | 404' } })
})

module.exports = pagesRouter
