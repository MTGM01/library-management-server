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

// Users api

app.get('/lib/users', (req, res) => {
  userController.get(res)
})

app.post('/lib/users/login', (req, res) => {
  userController.login(req, res)
})

app.post('/lib/users/register', (req, res) => {
  userController.register(req, res)
})

app.put('/lib/users/setCrime', (req, res) => {
  userController.setCrime(req, res)
})

app.delete('/lib/users/logout/', (req, res) => {
  userController.logout(req, res)
})

// Books api

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

app.listen(process.env.PORT, (err) => {
  if (err) throw err
  console.log(`Starting Server on Port ${process.env.PORT}`)
})
