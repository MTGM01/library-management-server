require("../configs/DB/db")
const { isValidObjectId } = require("mongoose")
const booksCollection = require('../schema/book')
const { validateAddedBook } = require("../configs/validator/validators")

const getAll = async () => {
  const books = await booksCollection.find({}).lean()
  return { data: { result: books } }
}

const getOne = async (bookID) => {
  const bookIDValid = isValidObjectId(bookID)
  if (bookIDValid) {
    const book = await booksCollection.findById({ _id: bookID }, '-createdAt -updatedAt -_id -__v')
    if (!book) {
      return {
        statusCode: 404,
        data: {
          message: "The Book not Found",
        }
      }
    }
    return {
      statusCode: 200,
      data: { result: book }
    }
  }
  return {
    statusCode: 422,
    data: {
      message: "The BookID is Invalid",
    }
  }
}

const remove = async (bookID) => {
  const bookIDValid = isValidObjectId(bookID)
  if (bookIDValid) {
    const deletedBook = await booksCollection.findByIdAndDelete({ _id: bookID })
    if (!deletedBook) {
      return {
        statusCode: 404,
        data: {
          message: "The Book not Found",
        }
      }
    }
    return {
      statusCode: 200,
      data: {
        result: deletedBook,
        message: "The Book Removed Successfully",
      }
    }
  }
  return {
    statusCode: 422,
    data: {
      message: "The BookID is Invalid",
    }
  }
}

const create = async (book) => {
  const validationResult = validateAddedBook(book)
  if (validationResult !== true) {
    return {
      statusCode: 422,
      data: {
        result: validationResult,
        message: "The Book Data is Invalid",
      },
    }
  }
  const newBook = await booksCollection.insertOne({
    ...book,
    isReserved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return {
    statusCode: 201,
    data: {
      result: newBook,
      message: "The Book Added to Library Successfully",
    },
  }
}

const edit = async (book, bookID) => {
  const bookIDValid = isValidObjectId(bookID)
  if (bookIDValid) {
    const editedBook = await booksCollection.findByIdAndUpdate({ _id: bookID }, { $set: { ...book, createdAt: new Date(), updatedAt: new Date() } })
    if (!editedBook) {
      return {
        statusCode: 404,
        data: { message: "The Book was not found !" },
      }
    }
    return {
      statusCode: 200,
      data: { result: editedBook, message: "The Book Updated Successfully" },
    }
  } else {
    return {
      statusCode: 422,
      data: {
        message: "The BookID is Invalid",
      }
    }
  }
}

module.exports = {
  getAll,
  getOne,
  remove,
  create,
  edit,
}
