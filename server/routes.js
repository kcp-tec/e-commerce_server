const userController = require('./controllers/userController')
const express = require('express')
const router = express.Router()

router.post('/insertUser', (req, res) => userController.insertUser(req, res))
router.get('/findUser/:userId', (req, res) => userController.findUser(req, res))


module.exports = router