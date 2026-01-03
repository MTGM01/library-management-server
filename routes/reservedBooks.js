const express = require('express')
const reservedBookController = require("../controllers/reservedBookController")
const reservedBooksRouter = express.Router()

reservedBooksRouter.get('', reservedBookController.getAll)

reservedBooksRouter.get('/:id', reservedBookController.getOne)

reservedBooksRouter.post('/reserve', reservedBookController.handleReservation)

reservedBooksRouter.delete('/delivery', reservedBookController.deliver)

module.exports = reservedBooksRouter
