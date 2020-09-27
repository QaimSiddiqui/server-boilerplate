const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/', userController.getAllUsers)

router.route('/profile/:userId')
    .get(userController.getUser)
    .patch(userController.updateUser)

module.exports = router
