const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')


router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/forget-password', authController.forgetPassword)
router.post('/reset-password', authController.resetPassword)



module.exports = router