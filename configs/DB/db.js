// const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require('mongoose')
require("dotenv").config();

/* # MongoDB

// Connection URL
// const url = process.env.DB_CONNECTION_URL;
// const client = new MongoClient(url);

// // Database Name
// const dbName = process.env.DB_NAME;

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   return db;
// }

*/

const connectionURL = process.env.DB_CONNECTION_URL + process.env.DB_NAME

async function main () {
  console.log(connectionURL);
  const db = await mongoose.connect(connectionURL)
  console.log("Connected successfully to server");
  return db
}

module.exports = {
  dbConnection: main
}





///////////////////////////////////////////////
/** GET (FIND) */
// const result = await booksCollection.findOne({title: 'ghanoon'})
// const result = await booksCollection
//   .find({
//     author: "J.K Rolling",
//     title: {
//       $in: [
//         "Harry Potter and The Prisoner of Azkaban",
//         "Harry Potter and The Goblet of Fire",
//       ],
//     },
//   })
//   .toArray();

/** DELETE */
// const result = await usersCollection.deleteOne({_id: new ObjectId('682cdd688dae917eff362109')})
// const result = await reservedBooksCollection.deleteMany({bookID: '682cdd688dae917eff36210e'})
// const result = await usersCollection.findOneAndDelete({userName: 'mahtab82'})

/** UPDATE */
// const result = await usersCollection.updateOne(
//   { userName: "sina" },
//   { $set: { role: "USER" } }
// );
// const result = await booksCollection.updateMany(
//   { author: "J.K Rolling" },
//   { $set: { isReserved: true, price: 25000 } }
// );
// const result = await booksCollection.findOneAndUpdate(
//   { author: "ebn sina" },
//   { $set: { desc: 'ghanoon and medical', publisher: 'jahad entesharat', price: 150000 } }
// );

/** REPLACE */
// const result = await booksCollection.replaceOne(
//   { author: "ebn sina" },
//   {
//     title: "ghanoon 2",
//     author: "ebn sina",
//     price: 150000,
//     isReserved: false,
//   }
// );
// const result = await usersCollection.findOneAndReplace(
//   { userName: "MTGM01" },
//   {
//     userName: "MTGM01",
//     password: "49511777",
//     mobile: "09363744951",
//     crime: 0,
//     role: "ADMIN",
//   }
// );

/** NESTED and OPERATORS */
// const result = await usersCollection.updateMany(
//   {},
//   {
//     $set: {
//       age: 23,
//       favorites: [
//         "Harry Potter series",
//         "Lord of the Rings",
//         "Sherek",
//         "Tan Tan",
//       ],
//       universityEducation: {
//         degree: "baccalaureate",
//         terms: 9,
//         lessons: [
//           "advanced programming",
//           "basic programming",
//           "computer architecture",
//           "wireless networks",
//           "ERS",
//           "DB",
//         ],
//       },
//     },
//   }
// );

// const result = await usersCollection
//   .find(
//     // { role: { $ne: "USER" } }
//     // { role: { $eq: "USER" }, crime: {$lte: 12000} }
//     // { age: { $gt: 23 }, crime: {$lt: 8000} }
//     // { age: { $gt: 20, $lt: 26 }, favorites: {$nin: ['kafka']} }
//     {
//       $or: [
//         {
//           age: { $gt: 20, $lte: 26 },
//           favorites: { $in: ["Harry Potter series", "Lord of the Rings"] },
//         },
//         { role: "ADMIN", "universityEducation.terms": 8 },
//       ],
//     }
//   )
//   .toArray();

// console.log(result[0].favorites);

/** DELETE COLLECTION and DB */
// const result = await booksCollection.drop()
// const result = await db.dropCollection('users')
// const result = await db.dropDatabase()

/** UPDATE OPERATORS */
// const result = await booksCollection.updateMany(
//   // { author: "J.K Rolling" },
//   { author: { $ne: "J.K Rolling" } },
//   {
//     // $set: { isReserved: true, price: 25000 },
//     // $unset: { isReserved: 1 /* '' */ },
//     // $inc: { price: 1000 },
//     // $min: { price: 17000 },
//     // $max: { price: 150000 },
//     $mul: { price: 2 },
//   }
// );

// const result = await usersCollection.updateOne(
//   { _id: new ObjectId('682cdd688dae917eff362105') },
//   {
//     // $set: { isReserved: true, price: 25000 },
//     // $unset: { isReserved: 1 /* '' */ },
//     // $inc: { price: 1000 },
//     // $min: { price: 17000 },
//     // $max: { price: 150000 },
//     // $push: { favorites: 'Peter Jackson and the olympian' },
//     // $pop: { favorites: 1 /* -1 */ },
//     // $pull: { favorites: 'Sherek' },
//     $addToSet: { favorites: 'Sherlok Holmz' },
//   }
// );

// const result = await usersCollection.countDocuments({ age: { $gte: 19 } });
// const result = await usersCollection.find({}).limit(2).toArray();
// const result = await usersCollection.find({}).sort({age: -1}).toArray();
// const result = await usersCollection.find({mobile: {$regex: /^(\+98|0)\d{10}$/g}}).sort({age: -1}).toArray();

// const result = await usersCollection.find(
//   {
//     // favorites: { $size: 3 },
//     // favorites: { $all: ['Tan Tan', 'Harry Potter series'] },
//     // favorites: ['Tan Tan'],
//     favorites: 'Tan Tan',
//   }
// ).toArray();

/** CreatedAt and UpdatedAt */
// const result = await usersCollection.updateMany(
//   { createdAt: { $exists: false }, updatedAt: { $exists: false } },
//   {
//     // $set: {
//     //   createdAt: new Date(),
//     //   updatedAt: new Date(),
//     // },
//     $currentDate: {
//       createdAt: true,
//       updatedAt: true,
//     },
//   }
// );
