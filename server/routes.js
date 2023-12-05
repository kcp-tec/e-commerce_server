const userController = require('./controllers/userController')
const express = require('express')
const router = express.Router()

router.post('/user/insertUser', (req, res) => userController.insertUser(req, res))

module.exports = router