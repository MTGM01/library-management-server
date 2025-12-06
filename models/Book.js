require("../configs/DB/db")
const { isValidObjectId } = require("mongoose")
const booksCollection = require('../schema/bookSchema')

const getAll = async () => {
  const db = await dbConnection()
  const booksCollection = db.collection("books")
  const books = await booksCollection.find({}).toArray()
  return books
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

const createOne = async (book) => {
  const db = await dbConnection()
  const booksCollection = db.collection("books")
  const newBook = await booksCollection.insertOne({
    ...book,
    isReserved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return {
    statusCode: 201,
    data: {
      createdBook: newBook,
      message: "The Book Added Successfully",
    },
  }
}

const edit = async (book) => {
  const db = await dbConnection()
  const booksCollection = db.collection("books")
  const editedBook = await booksCollection.findOneAndUpdate(
    { _id: { $eq: new ObjectId(book.id) } },
    {
      $set: {
        ...book,
      },
    }
  )
  if (editedBook) {
    return {
      statusCode: 200,
      data: { editedBook, message: "The Book Updated Successfully" },
    }
  } else {
    return {
      statusCode: 404,
      data: { message: "The Book was not found !" },
    }
  }
}

module.exports = {
  getAll,
  remove,
  createOne,
  edit,
}
