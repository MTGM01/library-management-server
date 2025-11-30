const ReservedBookModel = require("../models/ReservedBook.js");
const url = require("url");

const handleReservation = (req, res) => {
  let reqBody;
  req.on("data", (body) => {
    reqBody = JSON.parse(body);
  });
  req.on("end", async () => {
    const { userID, bookID } = reqBody;
    const bookReservationObj = await ReservedBookModel.reserve(userID, bookID);
    res.writeHead(bookReservationObj.statusCode, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify(bookReservationObj.data));
    res.end();
  });
};

const deliver = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const bookID = parsedUrl.query.bookID;
  const removedReservedBook = await ReservedBookModel.remove(bookID);
  res.writeHead(removedReservedBook.statusCode, {
    "Content-Type": "application/json",
  });
  res.write(JSON.stringify(removedReservedBook.data));
  res.end();
};

module.exports = {
  handleReservation,
  deliver,
};
