const BooksModel = require("../models/Books")
const fs = require('fs')
const path = require('path')

const deleteImage = (filename) => {
  if (!filename) return
  const filePath = path.join(__dirname, '..', 'public', 'uploads', 'book-covers', filename)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

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
  const removedBook = await BooksModel.remove(req.body.id)
  if (removedBook.statusCode === 200 && removedBook.data.result?.coverImage) {
    deleteImage(removedBook.data.result.coverImage)
  }
  res.statusCode = removedBook.statusCode
  res.json(removedBook.data)
}

const create = async (req, res) => {
  let newBook = req.body
  if (req.file) {
    newBook.coverImage = req.file.filename
  }
  if (newBook.total) newBook.total = Number(newBook.total)
  const createdBook = await BooksModel.create(newBook)
  res.status(createdBook.statusCode).json(createdBook.data)
}

const update = async (req, res) => {
  if (req.file) {
    if (req.body.oldCoverImage) {
      deleteImage(req.body.oldCoverImage)
    }
    req.body.coverImage = req.file.filename
  } else if (req.body.removeCoverImage === 'true') {
    deleteImage(req.body.coverImage)
    req.body.coverImage = ''
  }
  delete req.body.oldCoverImage
  delete req.body.removeCoverImage
  if (req.body.total) req.body.total = Number(req.body.total)
  if (req.body.availableCount) req.body.availableCount = Number(req.body.availableCount)
  const updatedBook = await BooksModel.edit(req.body)
  res.status(updatedBook.statusCode).json(updatedBook.data)
}

module.exports = {
  getAll,
  getOne,
  remove,
  create,
  update,
}
