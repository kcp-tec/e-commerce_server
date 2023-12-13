const userController = require('./controllers/userController')
const productController = require('./controllers/productController')
const cartController = require('./controllers/cartController')
const favoriteController = require('./controllers/favoriteController')
const emailController = require('./controllers/emailController')
const productCommentController = require('./controllers/productCommentController')
const commentLikeController = require('./controllers/commentLikeController')
const purchaseController = require('./controllers/purchaseController')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

const router = express.Router()

// Users
router.post('/insertUser', (req, res) =>
    // #swagger.tags = ['Users']
    userController.insertUser(req, res))

router.post('/login', (req, res) =>
    // #swagger.tags = ['Users']
    userController.login(req, res))

router.get('/findUserById/:userId', (req, res) =>
    // #swagger.tags = ['Users']
    userController.findUserById(req, res))

router.put('/blockUser', (req, res) =>
    // #swagger.tags = ['Users']
    userController.blockUser(req, res))

router.put('/updateUserByField', (req, res) =>
    // #swagger.tags = ['Users']
    userController.updateUserByField(req, res))

// Products
router.get('/listProductByCategory/:category', (req, res) =>
    // #swagger.tags = ['Products']
    productController.listProductByCategory(req, res))

router.post('/decreaseProduct', (req, res) =>
    // #swagger.tags = ['Products']
    productController.decreaseProduct(req, res))

router.put('/updateByField', (req, res) =>
    // #swagger.tags = ['Products']
    productController.updateUserByField(req, res))

router.post('/createProduct', (req, res) =>
    // #swagger.tags = ['Products']
    productController.createProduct(req, res))

router.post(`/insertProduct`, (req, res) =>
    // #swagger.tags = ['Products']
    productController.insertProduct(req, res))

router.get('/findProductByField/:field/:value', (req, res) =>
    // #swagger.tags = ['Products']
    productController.findProductByField(req, res))

router.post('/deleteProduct', (req, res) =>
    // #swagger.tags = ['Products']
    productController.deleteProduct(req, res))


// Carts
router.post('/insertProductToCart', (req, res) =>
    // #swagger.tags = ['Carts']
    cartController.insertProductToCart(req, res))

router.get('/findCartByUser/:userId', (req, res) =>
    // #swagger.tags = ['Carts']
    cartController.findCartByUser(req, res))

router.get('/listProductByUserId/:userId', (req, res) =>
    // #swagger.tags = ['Carts']
    cartController.listProductByUserId(req, res))

router.put('/removeProductFromCart', (req, res) =>
    // #swagger.tags = ['Carts']
    cartController.removeProductFromCart(req, res))


// Favorites
router.post('/favoriteProduct', (req, res) =>
    // #swagger.tags = ['Favorites']
    favoriteController.favoriteProduct(req, res))

router.get('/listFavoritesByUser/:userId', (req, res) =>
    // #swagger.tags = ['Favorites']
    favoriteController.listFavoritesByUser(req, res))


// Emails
router.post('/sendMail', (req, res) =>
    // #swagger.tags = ['Emails']
    emailController.sendMail(req, res))

router.get('/verifyToken/:token', (req, res) =>
    // #swagger.tags = ['Emails']
    emailController.verifyToken(req, res))

// ProductComment
router.post('/insertProductComment', (req, res) =>
    // #swagger.tags = ['ProductComment']
    productCommentController.insertProductComment(req, res))

router.get('/listProductCommentByProductId/:productId', (req, res) =>
    // #swagger.tags = ['ProductComment']
    productCommentController.listProductCommentByProductId(req, res))


// CommentLikes
router.post('/insertCommentLike', (req, res) =>
    // #swagger.tags = ['CommentLikes']
    commentLikeController.insertCommentLike(req, res))

router.get('/countCommentLikes/:productCommentId', (req, res) =>
    // #swagger.tags = ['CommentLikes']
    commentLikeController.countCommentLikes(req, res))

// Purchase
router.post('/insertCommentLike', (req, res) =>
    // #swagget.tags = ['Purchase']
    purchaseController.insertPurchase(req, res))

// Swagger 
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports = router