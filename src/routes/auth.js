const express = require('express')
const router = express.Router()
const { registerForm, registerUser, loginForm, loginUser, logout } = require('../controllers/authController')

router.get('/register', registerForm)
router.post('/register', registerUser)

router.get('/login', loginForm)
router.post('/login', loginUser)

router.get('/logout', logout)

module.exports = router