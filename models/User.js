require("../configs/DB/db")
const { isValidObjectId } = require("mongoose")
const usersCollection = require('../schema/userSchema')
const { validateUserRegister } = require("../configs/validator/validators")

const getAll = async () => {
  const db = await connectToDB()
  const usersCollection = db.collection("users")
  const users = await usersCollection.find({}).toArray()
  return users
}

const checkUserLogin = async (userName, password) => {
  const db = await connectToDB()
  const usersCollection = db.collection("users")
  const loggedinUser = await usersCollection.findOne({
    userName: { $eq: userName },
    password: { $eq: password },
  })
  return loggedinUser
}

const add = async (user) => {

  const validationResult = validateUserRegister(user)
  const existedUser = await usersCollection.findOne({
    $or: [
      { userName: user.userName },
      { password: user.password },
      { mobile: user.mobile }
    ]
  })

  if (existedUser) {
    return {
      statusCode: 409,
      data: { message: "The User Is Registered Before !" },
    }
  } else if (validationResult !== true) {
    const errorMessages = validationResult.map((validation) => validation.message)
    return {
      statusCode: 422,
      data: { messages: errorMessages },
    }
  } else {
    const { userName, password, mobile } = user
    const newUser = {
      userName,
      password,
      mobile,
      crime: 0,
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const createUserResult = await usersCollection.create(newUser)
    return {
      statusCode: 201,
      data: { result: createUserResult, message: "The User Registered Successfully" },
    }
  }
}

const remove = async (userID) => {
  const userIDValid = isValidObjectId(userID)
  if (userIDValid) {
    const deletedUser = await usersCollection.findByIdAndDelete({ _id: userID })
    if (!deletedUser) {
      return {
        statusCode: 404,
        data: {
          message: "The User not Found",
        }
      }
    }
    return {
      statusCode: 200,
      data: {
        result: deletedUser,
        message: "The User Logged out Successfully",
      }
    }
  }
  return {
    statusCode: 422,
    data: {
      message: "The UserID is Invalid",
    }
  }
}

const editCrime = async (user) => {
  const db = await connectToDB()
  const usersCollection = db.collection("users")
  const desiredUser = await usersCollection.findOneAndUpdate(
    { _id: { $eq: new ObjectId(user.id) } },
    {
      $set: {
        crime: user.crime,
      },
    }
  )
  if (desiredUser) {
    return {
      statusCode: 200,
      data: {
        user: desiredUser,
        message: "The user crime setted Successfully",
      },
    }
  } else {
    return {
      statusCode: 422,
      data: { message: "The user is not existed !" },
    }
  }
}

const editRole = async (user) => {
  const db = await connectToDB()
  const usersCollection = db.collection("users")
  const desiredUser = await usersCollection.findOneAndUpdate(
    { _id: { $eq: new ObjectId(user.id) } },
    {
      $set: {
        role: user.role,
      },
    }
  )
  if (desiredUser) {
    return {
      statusCode: 200,
      data: {
        user: desiredUser,
        message: "The user role updated Successfully",
      },
    }
  } else {
    return {
      statusCode: 422,
      data: { message: "The user is not existed !" },
    }
  }
}

module.exports = {
  getAll,
  checkUserLogin,
  add,
  editRole,
  editCrime,
  remove
}
