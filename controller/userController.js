const UserModel = require("../models/User.js")

const get = async (res) => {
  const allUsers = await UserModel.getAll()
  res.writeHead(200, { "Content-Type": "application/json" })
  res.write(JSON.stringify(allUsers))
  res.end()
}

const login = async (req, res) => {
  let user
  req.on("data", (body) => {
    user = JSON.parse(body)
  })
  req.on("end", async () => {
    const { userName, password } = user
    const isLogin = await UserModel.checkUserLogin(userName, password)
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

const register = (req, res) => {
  let user
  req.on("data", (body) => {
    user = JSON.parse(body)
  })
  req.on("end", async () => {
    const registerResponse = await UserModel.add(user)
    res.writeHead(registerResponse.statusCode, {
      "Content-Type": "application/json",
    })
    res.write(JSON.stringify(registerResponse.data))
    res.end()
  })
}

const setCrime = (req, res) => {
  let user
  req.on("data", (body) => {
    user = JSON.parse(body)
  })
  req.on("end", async () => {
    const userWithUpdatedCrime = await UserModel.editCrime(user)
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
    const newUserRole = await UserModel.editRole(user)
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
  register,
  updateRole,
  setCrime,
}
