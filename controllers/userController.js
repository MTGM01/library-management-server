const UsersModel = require("../models/User.js")

const get = async (req, res) => {
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
  res.status(registerResponse.statusCode).json(registerResponse.data)
}

const setCrime = async (req, res) => {
  const userWithUpdatedCrime = await UsersModel.editCrime(req.body)
  res.status(userWithUpdatedCrime.statusCode).json(userWithUpdatedCrime.data)
}

const updateRole = async (req, res) => {
  const newUserRole = await UsersModel.editRole(req.body)
  res.status(newUserRole.statusCode).json(newUserRole.data)
}

module.exports = {
  get,
  login,
  logout,
  register,
  updateRole,
  setCrime,
}
