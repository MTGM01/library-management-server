require("../configs/DB/db")
const { isValidObjectId } = require("mongoose")
const { booksCollection } = require('../schema/book')
const { usersCollection } = require('../schema/user')
const reservedBooksCollection = require('../schema/reservedBook')

const getAll = async () => {
  const reservedBooks = await reservedBooksCollection.find({}, '-createdAt -updatedAt -__v').lean()
  const mappedreservedBooks = reservedBooks.map(({ _id, userID, bookID }) => {
    return {
      _id,
      user: userID,
      book: bookID
    }
  })
  return { data: { result: mappedreservedBooks } }
}

const getOne = async (reservedBookID) => {
  const reservedBookIDValid = isValidObjectId(reservedBookID)
  if (reservedBookIDValid) {
    const reservedBook = await reservedBooksCollection.findById({ _id: reservedBookID }, '-createdAt -updatedAt -__v')
    if (!reservedBook) {
      return {
        statusCode: 404,
        data: {
          message: "The Reserved Book not Found",
        }
      }
    }
    return {
      statusCode: 200,
      data: { result: { _id: reservedBook._id, user: reservedBook.userID, book: reservedBook.bookID } }
    }
  }
  return {
    statusCode: 422,
    data: {
      message: "The Reserved BookID is Invalid",
    }
  }
}

const reserve = async (userID, bookID) => {
  const userIDValid = isValidObjectId(userID)
  const bookIDValid = isValidObjectId(bookID)
  if (userIDValid && bookIDValid) {
    const isBookExistedAndNotReserved = await booksCollection.findOne({
      _id: bookID,
      isReserved: false,
    })
    if (isBookExistedAndNotReserved) {
      await booksCollection.updateOne(
        { _id: bookID },
        {
          $set: {
            isReserved: true
          },
          $currentDate: {
            updatedAt: 1
          }
        })
      await usersCollection.updateOne({ _id: userID }, {
        $push: {
          reservedBooks: bookID
        }
      })
      const user = await usersCollection.findById({ _id: userID }, '-createdAt -updatedAt -__v -reservedBooks')
      const book = await booksCollection.findById({ _id: bookID }, '-createdAt -updatedAt -__v')
      const reservedBook = await reservedBooksCollection.insertOne({
        user,
        book,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      return {
        statusCode: 201,
        data: { result: reservedBook, message: "The Book Reserved Successfully" }
      }
    }
    return {
      statusCode: 404,
      data: { message: "The Book Is Not Existed Or The Desired Book Has Been Reserved !" },
    }
  }
  return {
    statusCode: 422,
    data: { message: "The BookID Or The UserID Is Invalid !" },
  }
}

const remove = async (userID, bookID) => {
  const userIDValid = isValidObjectId(userID)
  const bookIDValid = isValidObjectId(bookID)
  if (userIDValid && bookIDValid) {
    const deliveredBook = await booksCollection.findOneAndUpdate(
      { _id: bookID },
      {
        $set: {
          isReserved: false
        },
        $currentDate: {
          updatedAt: 1
        }
      })
    const userThatReservedTheBook = await usersCollection.findById({ _id: userID })
    const reservedBook = await reservedBooksCollection.findOneAndDelete({ bookID })
    if (reservedBook && deliveredBook) {
      return {
        statusCode: 200,
        data: { result: { reservedBook, deliveredBook, userThatReservedTheBook }, message: "The Book Delivered Successfully" },
      }
    }
    return {
      statusCode: 404,
      data: { message: "The Book Was not Found To Be Delivered !" },
    }
  }
  return {
    statusCode: 422,
    data: { message: "The BookID Or The UserID Is Invalid !" },
  }
}

module.exports = {
  getAll,
  getOne,
  reserve,
  remove,
}
