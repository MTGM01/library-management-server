const BookModel = require("../models/Book.js");
const url = require("url");

/* # Develop Book Controller with NodeJs

const get = async (res) => {
  const allBooks = await BookModel.getAll();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(allBooks));
  res.end();
};

const remove = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const bookID = parsedUrl.query.id;
  const removedBook = await BookModel.removeOne(bookID);
  res.writeHead(removedBook.statusCode, { "Content-Type": "application/json" });
  res.write(JSON.stringify(removedBook.data));
  res.end();
};

const create = (req, res) => {
  let book;
  req.on("data", (body) => {
    book = JSON.parse(body);
  });
  req.on("end", async () => {
    const createdBook = await BookModel.createOne(book);
    res.writeHead(createdBook.statusCode, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify(createdBook.data));
    res.end();
  });
};

const update = (req, res) => {
  let book;
  req.on("data", (body) => {
    book = JSON.parse(body);
  });
  req.on("end", async () => {
    const updatedBook = await BookModel.edit(book);
    res.writeHead(updatedBook.statusCode, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify(updatedBook.data));
    res.end();
  });
};

*/

// # # Develop Book Controller with ExpressJs

const get = async (res) => {
  const allBooks = await BookModel.getAll();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(allBooks));
  res.end();
};

const remove = async (req, res) => {
  const bookID = req.params.id;
  const removedBook = await BookModel.removeOne(bookID);
  res.statusCode = removedBook.statusCode;
  // res.status(removedBook.statusCode).send(removedBook.data);
  // res.json(removedBook.data);
  res.send(removedBook.data);
};

const create = async (req, res) => {
  let book = req.body;
  const createdBook = await BookModel.createOne(book);
  res.status(createdBook.statusCode).json(createdBook.data);
};

const update = (req, res) => {
  let book;
  req.on("data", (body) => {
    book = JSON.parse(body);
  });
  req.on("end", async () => {
    const updatedBook = await BookModel.edit(book);
    res.writeHead(updatedBook.statusCode, {
      "Content-Type": "application/json",
    });
    res.write(JSON.stringify(updatedBook.data));
    res.end();
  });
};

module.exports = {
  get,
  remove,
  create,
  update,
};
