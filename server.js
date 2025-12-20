require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')
const homeRouter = require('./routes/templates/page.js')
const usersRouter = require('./routes/users.js')
const booksRouter = require("./routes/books.js")
const reservedBooksRouter = require("./routes/reservedBooks.js")
const camelCase = require('./middlewares/camelCaseKeys.js')
const removeEmptyProperties = require('./middlewares/removeEmptyProperties.js')

// Running and Create Server using ExpressJs

//create server
const app = express()

// define request body and support urlencoded format data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// determining project static files
app.use(express.static(path.join(__dirname, 'public')))

// secure express http response by setting some headers in response object
app.use(helmet())

// access-control-allow to all origins
app.use(cors())

// camelcase all request body, params and query params properties
app.use(camelCase)

// delete properties with empty value
app.use(removeEmptyProperties({ omitZero: true }))

// server logger
app.use(morgan('dev'))

// pages Api
app.use('/lib/page', homeRouter)

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
