const express = require('express')
const bookController = require("../controllers/bookController")
const booksRouter = express.Router()

/** the below code is allowed in express 4 and in express 5 it is disallowed */
// booksRouter.route('/:id?').get(bookController.get)

booksRouter.get('', bookController.getAll)

booksRouter.get('/:id', bookController.getOne)

booksRouter.delete('/remove', bookController.remove)

booksRouter.post('/create', bookController.create)

booksRouter.put('/update', bookController.update)

module.exports = booksRouter
