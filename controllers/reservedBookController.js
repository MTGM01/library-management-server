const url = require("url")
const ReservedBooksModel = require("../models/ReservedBooks")

const handleReservation = async (req, res) => {
  const { userID, bookID } = req.body
  const bookReservationObj = await ReservedBooksModel.reserve(userID, bookID)
  res.status(bookReservationObj.statusCode).json(bookReservationObj.data)
}

const deliver = async (req, res) => {
  const bookID = req.query.bookID
  const userID = req.query.userID
  const removedReservedBook = await ReservedBooksModel.remove(userID, bookID)
  res.status(removedReservedBook.statusCode).json(removedReservedBook.data)
}

module.exports = {
  handleReservation,
  deliver,
}
