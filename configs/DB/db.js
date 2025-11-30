const mongoose = require('mongoose')
require("dotenv").config()

const connectionURL = process.env.DB_CONNECTION_URL + process.env.DB_NAME

async function connectToDB () {
  console.log(connectionURL)
  const db = await mongoose.connect(connectionURL)
  console.log("Server Connected to DB Successfully")
  return db
}

module.exports = {
  connectToDB
}
