const express = require('express')
const reservedBookController = require("../controllers/reservedBookController")
const checkBlockedUser = require("../middlewares/checkBlockedUser")
const reservedBooksRouter = express.Router()

reservedBooksRouter.get('', reservedBookController.getAll)

reservedBooksRouter.get('/:id', reservedBookController.getOne)

reservedBooksRouter.post('/reserve', checkBlockedUser, reservedBookController.handleReservation)

reservedBooksRouter.delete('/delivery', checkBlockedUser, reservedBookController.deliver)

module.exports = reservedBooksRouter
