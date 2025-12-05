const UsersModel = require("../models/User.js")

const get = async (res) => {
  const allUsers = await UsersModel.getAll()
  res.json(allUsers)
}

const login = async (req, res) => {
  let user
  req.on("data", (body) => {
    user = JSON.parse(body)
  })
  req.on("end", async () => {
    const { userName, password } = user
    const isLogin = await UsersModel.checkUserLogin(userName, password)
    if (isLogin) {
      res.writeHead(200, { "Content-Type": "application/json" })
      res.write(
        JSON.stringify({
          data: {
            loggedinUser: isLogin,
            message: "You are logged in successfully",
          },
        })
      )
    } else {
      res.writeHead(401, { "Content-Type": "application/json" })
      res.write(
        JSON.stringify({
          data: { message: "The user is not authorized !" },
        })
      )
    }
    res.end()
  })
}

const logout = async (req, res) => {
  const userDeletionResult = await UsersModel.remove(req.params.id)
  res.status(userDeletionResult.statusCode).json(userDeletionResult.data)
}

const register = async (req, res) => {
  const registerResponse = await UsersModel.add(req.body)
  res.status(registerResponse.statusCode).json(registerResponse)
}

const setCrime = (req, res) => {
  let user
  req.on("data", (body) => {
    user = JSON.parse(body)
  })
  req.on("end", async () => {
    const userWithUpdatedCrime = await UsersModel.editCrime(user)
    res.writeHead(userWithUpdatedCrime.statusCode, {
      "Content-Type": "application/json",
    })
    res.write(JSON.stringify(userWithUpdatedCrime.data))
    res.end()
  })
}

const updateRole = (req, res) => {
  let user
  req.on("data", (body) => {
    user = JSON.parse(body)
  })
  req.on("end", async () => {
    const newUserRole = await UsersModel.editRole(user)
    res.writeHead(newUserRole.statusCode, {
      "Content-Type": "application/json",
    })
    res.write(JSON.stringify(newUserRole.data))
    res.end()
  })
}

module.exports = {
  get,
  login,
  logout,
  register,
  updateRole,
  setCrime,
}
