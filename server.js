require('dotenv').config()
const express = require('express')
const usersRouter = require('./routes/users.js')
const bookController = require("./controllers/bookController.js")
const reservedBookController = require("./controllers/reservedBookController.js")

// Running and Create Server using ExpressJs

//create server
const app = express()

// define request body
app.use(express.json())
app.use(express.urlencoded())

// Users Api
app.use('/lib/users', usersRouter)

// Books Api

app.get('/lib/books', (req, res) => {
  bookController.get(res)
})

app.delete('/lib/books/remove/:id', (req, res) => {
  bookController.remove(req, res)
})

app.post('/lib/books/create', (req, res) => {
  bookController.create(req, res)
})

app.put('/lib/books/update/:id', (req, res) => {
  bookController.update(req, res)
})

// Reserved Books Api

app.post('/lib/reservedBooks/reserve', (req, res) => {
  reservedBookController.handleReservation(req, res)
})

app.delete('/lib/reservedBooks/delivery', (req, res) => {
  reservedBookController.deliver(req, res)
})

app.listen(process.env.PORT, (err) => {
  if (err) throw err
  console.log(`Starting Server on Port ${process.env.PORT}`)
})
