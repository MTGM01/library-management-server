const BooksModel = require("../models/Book")

const get = async (res) => {
  const allBooks = await BooksModel.getAll()
  res.json(allBooks)
}

const remove = async (req, res) => {
  const removedBook = await BooksModel.remove(req.params.id)
  res.statusCode = removedBook.statusCode
  res.json(removedBook.data)
}

const create = async (req, res) => {
  let newBook = req.body
  const createdBook = await BooksModel.create(newBook)
  res.status(createdBook.statusCode).json(createdBook.data)
}

const update = (req, res) => {
  let book
  req.on("data", (body) => {
    book = JSON.parse(body)
  })
  req.on("end", async () => {
    const updatedBook = await BooksModel.edit(book)
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
