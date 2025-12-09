require("../configs/DB/db")
const { isValidObjectId } = require("mongoose")
const booksCollection = require('../schema/bookSchema')
const reservedBooksCollection = require('../schema/reservedBookSchema')

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
        }
      )
      const reservedBook = await reservedBooksCollection.insertOne({
        userID,
        bookID,
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
  } else {
    return {
      statusCode: 422,
      data: { message: "The BookID Or The UserID Is Invalid !" },
    }
  }
}

const remove = async (bookID) => {
  const db = await dbConnection()
  const reservedBooksCollection = db.collection("reservedBooks")
  const booksCollection = db.collection("books")
  const reservedBook = await booksCollection.findOneAndUpdate(
    { _id: { $eq: new ObjectId(bookID) } },
    {
      $set: {
        isReserved: false,
      },
    }
  )
  const deliveredBook = await reservedBooksCollection.findOneAndDelete({
    bookID: { $eq: bookID },
  })
  if (reservedBook && deliveredBook) {
    return {
      statusCode: 200,
      data: { reservedBook, message: "The Book Delivered Successfully" },
    }
  } else {
    return {
      statusCode: 404,
      data: { message: "The Book Was not Found !" },
    }
  }
}

module.exports = {
  reserve,
  remove,
}
