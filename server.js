require('dotenv').config()
const express = require('express')
const userController = require("./controller/userController.js")
const bookController = require("./controller/bookController.js")
const reservedBookController = require("./controller/reservedBookController.js")

// Running and Create Server using ExpressJs

//create server
const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.get('/lib/users', (req, res) => {
  console.log(req.baseUrl);
  console.log(req.url);

  userController.get(res)
})

app.post('/lib/users/register', (req, res) => {
  userController.register(req, res)
})

app.delete('/lib/books/remove/:id', (req, res) => {
  bookController.remove(req, res)
})

app.delete('/lib/users/logout/:id', (req, res) => {
  userController.logout(req, res)
})

app.post('/lib/books/create', (req, res) => {
  bookController.create(req, res)
})

app.get('/products', (req, res) => {
  res.send('Welcome to the Products page')
})

app.listen(process.env.PORT, (err) => {
  if (err) throw err
  console.log(`Starting Server on Port ${process.env.PORT}`)
})
