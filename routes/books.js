const express = require('express')
const bookController = require("../controllers/bookController")
const upload = require("../middlewares/upload")
const booksRouter = express.Router()

booksRouter.get('', bookController.getAll)

booksRouter.get('/:id', bookController.getOne)

booksRouter.delete('/remove', bookController.remove)

booksRouter.post('/create', upload.single('coverImage'), bookController.create)

booksRouter.put('/update', upload.single('coverImage'), bookController.update)

module.exports = booksRouter
