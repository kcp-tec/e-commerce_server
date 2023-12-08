const userController = require('./controllers/userController')
const productController = require('./controllers/productController')
const cartController = require('./controllers/cartController')
const favoriteController = require('./controllers/favoriteController')
const emailController = require('./controllers/emailController')
const express = require('express')
const router = express.Router()

// Users
router.post('/insertUser', (req, res) => userController.insertUser(req, res))
router.post('/login', (req, res) => userController.login(req, res))
router.get('/findUserById/:userId', (req, res) => userController.findUserById(req, res))
router.put('/blockUser', (req, res) => userController.blockUser(req, res))

// Products
router.post('/decreaseProduct', (req, res) => productController.decreaseProduct(req, res))
router.post('/createProduct', (req, res) => productController.createProduct(req, res))
router.post(`/insertProduct`, (req, res) => productController.insertProduct(req, res))
router.get('/findProductByField/:field/:value', (req, res) => productController.findProductByField(req, res))
router.post('/deleteProduct',(req, res) => productController.deleteProduct(req, res))

// Carts
router.post('/insertProductToCart', (req, res) => cartController.insertProductToCart(req, res))
router.get('/findCartByUser/:userId', (req, res) => cartController.findCartByUser(req, res))

// Favorites
router.post('/favoriteProduct', (req, res) => favoriteController.favoriteProduct(req, res))
router.get('/listFavoritesByUser/:userId', (req, res) => favoriteController.listFavoritesByUser(req, res))

// Emails
router.post('/sendMail', (req, res) => { emailController.sendMail(req, res) })
module.exports = router