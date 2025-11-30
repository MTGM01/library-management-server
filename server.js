require('dotenv').config()
const http = require("http")
const userController = require("./controller/userController.js")
const bookController = require("./controller/bookController.js")
const reservedBookController = require("./controller/reservedBookController.js")

// Running and Create Server using pure NodeJs

const libWebService = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/lib/users") {
    userController.get(res)
  } else if (req.method === "GET" && req.url === "/lib/books") {
    bookController.get(res)
  } else if (req.method === "DELETE" && ~req.url.search("/lib/books/remove")) {
    bookController.remove(req, res)
  } else if (req.method === "POST" && req.url === "/lib/books/create") {
    bookController.create(req, res)
  } else if (req.method === "PUT" && req.url === "/lib/books/update") {
    bookController.update(req, res)
  } else if (req.method === "POST" && req.url === "/lib/users/login") {
    userController.login(req, res)
  } else if (req.method === "POST" && req.url === "/lib/users/register") {
    userController.register(req, res)
  } else if (req.method === "PUT" && req.url === "/lib/users/setCrime") {
    userController.setCrime(req, res)
  } else if (req.method === "PUT" && req.url === "/lib/users/upgradeRole") {
    userController.updateRole(req, res)
  } else if (
    req.method === "POST" &&
    req.url === "/lib/reservedBooks/reserve"
  ) {
    reservedBookController.handleReservation(req, res)
  } else if (
    req.method === "DELETE" &&
    ~req.url.search("/lib/reservedBooks/delivery")
  ) {
    reservedBookController.deliver(req, res)
  }
})

libWebService.listen(process.env.PORT, () => {
  console.log(`Starting Server on Port ${process.env.PORT}`)
})
