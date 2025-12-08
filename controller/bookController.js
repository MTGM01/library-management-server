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

const update = async (req, res) => {
  const updatedBook = await BooksModel.edit(req.body, req.params.id)
  res.status(updatedBook.statusCode).json(updatedBook.data)
}

module.exports = {
  get,
  remove,
  create,
  update,
}
