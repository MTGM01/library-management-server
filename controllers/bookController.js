const BooksModel = require("../models/Books")

const getAll = async (req, res) => {
  const { category } = req.query
  const allBooks = await BooksModel.getAll(category)
  res.json(allBooks.data)
}

const getOne = async (req, res) => {
  const { id } = req.params
  const book = await BooksModel.getOne(id)
  res.status(book.statusCode).json(book.data)
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
  getAll,
  getOne,
  remove,
  create,
  update,
}
