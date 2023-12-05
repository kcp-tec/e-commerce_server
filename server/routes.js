const userController = require('./controllers/userController')
const express = require('express')
const router = express.Router()

router.post('/insertUser', (req, res) => userController.insertUser(req, res))
router.post('/login', (req, res) => userController.login(req, res))
router.get('/findUserById/:userId', (req, res) => userController.findUser(req, res))


module.exports = router