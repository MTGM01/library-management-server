require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const usersRouter = require('./routes/users.js')
const booksRouter = require("./routes/books.js")
const reservedBooksRouter = require("./routes/reservedBooks.js")

// Running and Create Server using ExpressJs

//create server
const app = express()

// define request body
app.use(express.json())
app.use(express.urlencoded())

// server logger
app.use(morgan('dev'))

// Users Api
app.use('/lib/users', usersRouter)

// Books Api
app.use('/lib/books', booksRouter)

// Reserved Books Api
app.use('/lib/reservedBooks', reservedBooksRouter)

app.listen(process.env.PORT, (err) => {
  if (err) throw err
  console.log(`Starting Server on Port ${process.env.PORT}`)
})
