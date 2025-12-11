const express = require('express')
const userController = require("./controllers/userController.js")
const usersRouter = express.Router()

usersRouter.get('', (req, res) => {
    userController.get(res)
})

usersRouter.post('/login', (req, res) => {
    userController.login(req, res)
})

usersRouter.post('/register', (req, res) => {
    userController.register(req, res)
})

usersRouter.put('/setCrime', (req, res) => {
    userController.setCrime(req, res)
})

usersRouter.put('/upgradeRole', (req, res) => {
    userController.updateRole(req, res)
})

usersRouter.delete('/logout/', (req, res) => {
    userController.logout(req, res)
})

module.exports = usersRouter