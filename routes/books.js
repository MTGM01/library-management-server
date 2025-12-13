const express = require('express')
const bookController = require("../controllers/bookController")
const booksRouter = express.Router()

/** the below code is allowed in express 4 and in express 5 it is disallowed */
// booksRouter.route('/:id?').get(bookController.get)

booksRouter.get('/:id', bookController.getOne)

booksRouter.get('', bookController.getAll)

booksRouter.delete('/remove/:id', bookController.remove)

booksRouter.post('/create', bookController.create)

booksRouter.put('/update/:id', bookController.update)

module.exports = booksRouter
