const { MongoClient } = require("mongodb")
require("dotenv").config()

// Connection URL
const url = process.env.DB_CONNECTION_URL
const client = new MongoClient(url)
// Database Name
const dbName = process.env.DB_NAME

async function connectToDB() {
  // Use connect method to connect to MongoDB
  await client.connect()
  console.log("Server Connected to DB Successfully")
  const db = client.db(dbName)
  return db
}

module.exports = {
  connectToDB
}
