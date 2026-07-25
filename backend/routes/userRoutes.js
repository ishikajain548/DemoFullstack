const express = require('express')

const router = express.Router()

const isAuthenticated = require("../middleware/auth")

const userController = require('../controllers/userController')

router.get('/users' ,isAuthenticated, userController.getAllUsers)

router.get('/:id' ,isAuthenticated, userController.getUserById)

router.put('/:id', isAuthenticated,userController.updateUserPutRequest)

router.patch('/:id',isAuthenticated,userController.updateUserPatchRequest)

router.delete('/:id' , isAuthenticated,userController.deleteUser)


module.exports = router;

