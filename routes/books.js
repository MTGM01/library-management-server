const express = require('express')
const bookController = require("../controllers/bookController")
const booksRouter = express.Router()

booksRouter.get('', (req, res) => {
    bookController.get(res)
})

booksRouter.delete('/remove/:id', (req, res) => {
    bookController.remove(req, res)
})

booksRouter.post('/create', (req, res) => {
    bookController.create(req, res)
})

booksRouter.put('/update/:id', (req, res) => {
    bookController.update(req, res)
})

module.exports = booksRouter