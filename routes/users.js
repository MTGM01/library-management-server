const express = require('express')
const userController = require("../controllers/userController")
const usersRouter = express.Router()
const validateAdmin = require('../middlewares/isAdmin')
const validateDeletion = require('../middlewares/validateUserDeletion')

// usersRouter.use(validateAdmin)

usersRouter.get('', userController.getAll)

usersRouter.get('/status/:id', userController.getStatus)

usersRouter.get('/:id', validateAdmin, userController.getOne)

usersRouter.post('/login', userController.login)

usersRouter.post('/register', userController.register)

usersRouter.post('/admin/add', userController.adminAddUser)

usersRouter.put('/setCrime', userController.setCrime)

usersRouter.put('/upgradeRole', userController.updateRole)

usersRouter.put('/setStatus', userController.setStatus)

usersRouter.delete('/logout', validateDeletion, userController.logout)

module.exports = usersRouter
