require("../configs/DB/db")
const { isValidObjectId } = require("mongoose")
const usersCollection = require('../schema/user')
const { validateUserRegister } = require("../configs/validator/validators")

const getAll = async () => {
  const users = await usersCollection.find({}, '-createdAt -updatedAt -_id')
  return users
}

const checkUserLogin = async (userName, password) => {
  const loggedinUser = await usersCollection.findOne({ userName: userName, password: password })
  if (loggedinUser) {
    return {
      statusCode: 202,
      data: {
        result: loggedinUser,
        message: "You are logged in successfully",
      }
    }
  } else {
    return {
      statusCode: 401,
      data: { message: "The user is not authorized !" }
    }
  }
}

const add = async (user) => {
  const validationResult = validateUserRegister(user)
  const existedUser = await usersCollection.findOne({
    $or: [
      { userName: user.userName },
      { password: user.password },
      { mobile: user.mobile }
    ]
  }).select('userName password mobile')

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

const remove = async ({ userName }) => {
  const deletedUser = await usersCollection.findOneAndDelete({ userName }).select('userName password mobile')
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

const editCrime = async ({ id, crime }) => {
  const userIDValid = isValidObjectId(id)
  if (userIDValid) {
    const desiredUser = await usersCollection.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          crime,
        },
        $currentDate: {
          updatedAt: 1
        }
      }
    )
    if (desiredUser) {
      return {
        statusCode: 200,
        data: {
          result: desiredUser,
          message: "The User Crime Setted Successfully",
        }
      }
    }
    return {
      statusCode: 404,
      data: {
        message: "The User not Found",
      }
    }
  } else {
    return {
      statusCode: 422,
      data: { message: "The UserID Is Invalid !" },
    }
  }
}

const editRole = async ({ id, role }) => {
  const userIDValid = isValidObjectId(id)
  if (userIDValid) {
    const desiredUser = await usersCollection.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          role,
        },
        $currentDate: {
          updatedAt: 1
        }
      }
    )
    if (desiredUser) {
      return {
        statusCode: 200,
        data: {
          result: desiredUser,
          message: "The User Role Updated Successfully",
        }
      }
    }
    return {
      statusCode: 404,
      data: {
        message: "The User not Found",
      }
    }
  } else {
    return {
      statusCode: 422,
      data: { message: "The UserID Is Invalid !" },
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
