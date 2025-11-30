const { dbConnection } = require("../configs/DB/db.js");
const { ObjectId } = require("mongodb");

const reserve = async (userID, bookID) => {
  const db = await dbConnection();
  const reservedBooksCollection = db.collection("reservedBooks");
  const booksCollection = db.collection("books");
  const isBookExistedAndNotReserved = await booksCollection.findOne({
    _id: { $eq: new ObjectId(bookID) },
    isReserved: false,
  });
  if (isBookExistedAndNotReserved) {
    await booksCollection.updateOne(
      { _id: { $eq: new ObjectId(bookID) } },
      {
        $set: {
          isReserved: true,
        },
      }
    );
    const reservedBook = await reservedBooksCollection.insertOne({
      userID,
      bookID,
    });
    return {
      statusCode: 201,
      data: { reservedBook, message: "The book reserved Successfully" },
    };
  } else {
    return {
      statusCode: 422,
      data: { message: "The book is not existed or it is reserved !" },
    };
  }
};

const remove = async (bookID) => {
  const db = await dbConnection();
  const reservedBooksCollection = db.collection("reservedBooks");
  const booksCollection = db.collection("books");
  const reservedBook = await booksCollection.findOneAndUpdate(
    { _id: { $eq: new ObjectId(bookID) } },
    {
      $set: {
        isReserved: false,
      },
    }
  );
  const deliveredBook = await reservedBooksCollection.findOneAndDelete({
    bookID: { $eq: bookID },
  });
  if (reservedBook && deliveredBook) {
    return {
      statusCode: 200,
      data: { reservedBook, message: "The Book Delivered Successfully" },
    };
  } else {
    return {
      statusCode: 404,
      data: { message: "The Book Was not Found !" },
    };
  }
};

module.exports = {
  reserve,
  remove,
};
