const express = require('express')
const bookController = require("../controllers/bookController")
const booksRouter = express.Router()


booksRouter.get('', bookController.get)

booksRouter.route('/:id').delete(bookController.remove).put(bookController.update)

booksRouter.post('/create', bookController.create)

module.exports = booksRouter