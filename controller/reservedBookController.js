const url = require("url")
const ReservedBooksModel = require("../models/ReservedBooks")

const handleReservation = async (req, res) => {
  const { userID, bookID } = req.body
  const bookReservationObj = await ReservedBooksModel.reserve(userID, bookID)
  res.status(bookReservationObj.statusCode).json(bookReservationObj.data)
}

const deliver = async (req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const bookID = parsedUrl.query.bookID
  const removedReservedBook = await ReservedBooksModel.remove(bookID)
  res.writeHead(removedReservedBook.statusCode, {
    "Content-Type": "application/json",
  })
  res.write(JSON.stringify(removedReservedBook.data))
  res.end()
}

module.exports = {
  handleReservation,
  deliver,
}
