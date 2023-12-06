const userController = require('./controllers/userController')
const productController = require('./controllers/productController')
const express = require('express')
const router = express.Router()

// Users
router.post('/insertUser', (req, res) => userController.insertUser(req, res))
router.post('/login', (req, res) => userController.login(req, res))
router.get('/findUserById/:userId', (req, res) => userController.findUser(req, res))
router.put('/blockUser', (req, res) => userController.blockUser(req, res))

// Products
router.post('/insertProduct', (req, res) => productController.insertProduct(req, res))

module.exports = router