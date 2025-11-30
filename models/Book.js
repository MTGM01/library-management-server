const { ObjectId } = require("mongodb")
const { dbConnection } = require("../configs/DB/db.js")

const getAll = async () => {
  const db = await dbConnection()
  const booksCollection = db.collection("books")
  const books = await booksCollection.find({}).toArray()
  return books
}

const removeOne = async (bookID) => {
  const db = await dbConnection()
  const booksCollection = db.collection("books")
  const removedBook = await booksCollection.findOneAndDelete({
    _id: { $eq: new ObjectId(bookID) },
  })
  if (removedBook) {
    return {
      statusCode: 200,
      data: { removedBook, message: "Book Removed Successfully" },
    }
  } else {
    return {
      statusCode: 404,
      data: { message: "The Book Was not Found !" },
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
  removeOne,
  createOne,
  edit,
}
