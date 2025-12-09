const UsersModel = require("../models/User.js")

const get = async (res) => {
  const allUsers = await UsersModel.getAll()
  res.json(allUsers)
}

const login = async (req, res) => {
  const user = req.body
  const { userName, password } = user
  const loginResult = await UsersModel.checkUserLogin(userName, password)
  res.status(loginResult.statusCode).json(loginResult.data)
}

const logout = async (req, res) => {
  const userDeletionResult = await UsersModel.remove(req.body)
  res.status(userDeletionResult.statusCode).json(userDeletionResult.data)
}

const register = async (req, res) => {
  const registerResponse = await UsersModel.add(req.body)
  res.status(registerResponse.statusCode).json(registerResponse)
}

const setCrime = async (req, res) => {
  const userWithUpdatedCrime = await UsersModel.editCrime(req.body)
  res.status(userWithUpdatedCrime.statusCode).json(userWithUpdatedCrime.data)
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
