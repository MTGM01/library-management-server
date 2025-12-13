const express = require('express')
const bookController = require("../controllers/bookController")
const booksRouter = express.Router()


booksRouter.get('', bookController.get)

booksRouter.delete('/remove/:id', bookController.remove)

booksRouter.post('/create', bookController.create)

booksRouter.put('/update/:id', bookController.update)

module.exports = booksRouter