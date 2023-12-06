const express = require('express')

const { loginUser, signupUser, userDashboard } = require('../controllers/userController')

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)

router.get('/dashboard/:id', userDashboard)

module.exports = router