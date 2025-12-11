const express = require('express')
const reservedBookController = require("../controllers/reservedBookController")
const reservedBooksRouter = express.Router()

reservedBooksRouter.post('/reserve', (req, res) => {
    reservedBookController.handleReservation(req, res)
})

reservedBooksRouter.delete('/delivery', (req, res) => {
    reservedBookController.deliver(req, res)
})

module.exports = reservedBooksRouter