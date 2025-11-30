const express = require('express')
require('dotenv').config()
const userController = require("./controller/userController.js")
const bookController = require("./controller/bookController.js")
const reservedBookController = require("./controller/reservedBookController.js")

// Running and Create Server using ExpressJs

//create server
const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.delete('/lib/books/remove/:id', (req, res) => {
  bookController.remove(req, res)
})

app.post('/lib/books/create', (req, res) => {
  bookController.create(req, res)
})

app.get('/products', (req, res) => {
  res.send('Welcome to the Products page')
})

app.listen(process.env.PORT, () => {
  console.log(`Starting Server on Port ${process.env.PORT}`)
})
