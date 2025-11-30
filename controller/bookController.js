const BookModel = require("../models/Book.js")

// Develop Book Controller with ExpressJs

const get = async (res) => {
  const allBooks = await BookModel.getAll()
  res.writeHead(200, { "Content-Type": "application/json" })
  res.write(JSON.stringify(allBooks))
  res.end()
}

const remove = async (req, res) => {
  const bookID = req.params.id
  const removedBook = await BookModel.removeOne(bookID)
  res.statusCode = removedBook.statusCode
  // res.status(removedBook.statusCode).send(removedBook.data)
  // res.json(removedBook.data)
  res.send(removedBook.data)
}

const create = async (req, res) => {
  let book = req.body
  const createdBook = await BookModel.createOne(book)
  res.status(createdBook.statusCode).json(createdBook.data)
}

const update = (req, res) => {
  let book
  req.on("data", (body) => {
    book = JSON.parse(body)
  })
  req.on("end", async () => {
    const updatedBook = await BookModel.edit(book)
    res.writeHead(updatedBook.statusCode, { "Content-Type": "application/json" })
    res.write(JSON.stringify(updatedBook.data))
    res.end()
  })
}

module.exports = {
  get,
  remove,
  create,
  update,
}
