const mongoose = require('mongoose')
require("dotenv").config()

const connectionURL = process.env.DB_CONNECTION_URL + process.env.DB_NAME

mongoose.connect(connectionURL)
    .then(() => console.log("Server Connected to DB Successfully"))
    .catch((err) => console.log(err))
