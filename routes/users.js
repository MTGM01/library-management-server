const express = require('express')
const userController = require("../controllers/userController")
const usersRouter = express.Router()

usersRouter.get('', userController.getAll)

usersRouter.get('/:id', userController.getOne)

usersRouter.post('/login', userController.login)

usersRouter.post('/register', userController.register)

usersRouter.put('/setCrime', userController.setCrime)

usersRouter.put('/upgradeRole', userController.updateRole)

usersRouter.delete('/logout', userController.logout)

module.exports = usersRouter