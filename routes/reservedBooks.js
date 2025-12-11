const express = require('express')
const reservedBookController = require("../controllers/reservedBookController")
const reservedBooksRouter = express.Router()

reservedBooksRouter.post('/reserve', reservedBookController.handleReservation)

reservedBooksRouter.delete('/delivery', reservedBookController.deliver)

module.exports = reservedBooksRouter