const userController = require("./controllers/userController");
const productController = require("./controllers/productController");
const cartController = require("./controllers/cartController");
const favoriteController = require("./controllers/favoriteController");
const emailController = require("./controllers/emailController");
const productCommentController = require("./controllers/productCommentController");
const commentLikeController = require("./controllers/commentLikeController");
const purchaseController = require("./controllers/purchaseController");
const productImageController = require("./controllers/productImageController");
const upload = require("./configUpload/configUpload");
const addressController = require('./controllers/addressController')
const securityController = require("./controllers/securityController")
const jwt = require("./utils/jwt")

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const router = express.Router();


// Users
router.post("/insertUser", (req, res) =>
  // #swagger.tags = ['Users']
  userController.insertUser(req, res)
);

router.post("/login", (req, res) =>
  // #swagger.tags = ['Users']
  userController.login(req, res)
);

router.get("/findUserById/:userId", securityController.validateToken, (req, res) =>{
  // #swagger.tags = ['Users']
  /* 
  #swagger.security = [{
            "bearerAuth": []
  }] */
    userController.findUserById(req, res)
});

router.put("/blockUser", securityController.validateToken,(req, res) =>{
  // #swagger.tags = ['Users']
    /* 
  #swagger.security = [{
            "bearerAuth": []
  }] */
  userController.blockUser(req, res)
});

router.put("/updateUserByField",  securityController.validateToken,(req, res) =>
  // #swagger.tags = ['Users']
      /* 
  #swagger.security = [{
            "bearerAuth": []
  }] */
  userController.updateUserByField(req, res)
);

// Products
router.get("/listProductByCategory/:category", (req, res) =>
  // #swagger.tags = ['Products']
  productController.listProductByCategory(req, res)
);

router.put('/ableProduct', (req, res) =>

  productController.ableProduct(req, res)
);


router.put('/disableProduct', (req, res) =>

  productController.disableProduct(req, res)
);

router.post("/decreaseProduct",  securityController.validateToken,(req, res) =>
  // #swagger.tags = ['Products']
      /* 
  #swagger.security = [{
            "bearerAuth": []
  }] */
  productController.decreaseProduct(req, res)
);

router.put("/updateByField",  securityController.validateToken,(req, res) =>
  // #swagger.tags = ['Products']
      /* 
  #swagger.security = [{
            "bearerAuth": []
  }] */
  productController.updateUserByField(req, res)
);

router.post("/createProduct",  securityController.validateToken,(req, res) =>
  // #swagger.tags = ['Products']
      /* 
  #swagger.security = [{
            "bearerAuth": []
  }] */
  productController.createProduct(req, res)
);

router.post(`/insertProduct`,  securityController.validateToken,(req, res) =>
  // #swagger.tags = ['Products']
      /* 
  #swagger.security = [{
            "bearerAuth": []
  }] */
  productController.insertProduct(req, res)
);

router.get("/findProductByField/:field/:value", (req, res) =>
  // #swagger.tags = ['Products']
  productController.findProductByField(req, res)
);

router.post('/deleteProductById', (req, res) =>

  productController.deleteProductById(req, res)
);

// Carts
router.post("/insertProductToCart", (req, res) =>
  // #swagger.tags = ['Carts']
  cartController.insertProductToCart(req, res)
);

router.get("/findCartByUser/:userId",  securityController.validateToken,(req, res) =>
  // #swagger.tags = ['Carts']
      /* 
  #swagger.security = [{
            "bearerAuth": []
  }] */
  cartController.findCartByUser(req, res)
);

router.get("/listProductByUserId/:userId", (req, res) =>
  // #swagger.tags = ['Carts']
  cartController.listProductByUserId(req, res)
);

router.put("/removeProductFromCart",  securityController.validateToken,(req, res) =>
  // #swagger.tags = ['Carts']
      /* 
  #swagger.security = [{
            "bearerAuth": []
  }] */
  cartController.removeProductFromCart(req, res)
);

// Favorites
router.post("/favoriteProduct",  securityController.validateToken,(req, res) =>
  // #swagger.tags = ['Favorites']
      /* 
  #swagger.security = [{
            "bearerAuth": []
  }] */
  favoriteController.favoriteProduct(req, res)
);

router.get("/listFavoritesByUser/:userId",  securityController.validateToken,(req, res) =>
  // #swagger.tags = ['Favorites']
      /* 
  #swagger.security = [{
            "bearerAuth": []
  }] */
  favoriteController.listFavoritesByUser(req, res)
);

// Emails
router.post("/sendMail", (req, res) =>
  // #swagger.tags = ['Emails']
  emailController.sendMail(req, res)
);

router.get("/verifyToken/:token", (req, res) =>
  // #swagger.tags = ['Emails']
  emailController.verifyToken(req, res)
);

// ProductComment
router.post("/insertProductComment", (req, res) =>
  // #swagger.tags = ['ProductComment']
  productCommentController.insertProductComment(req, res)
);

router.get("/listProductCommentByProductId/:productId", (req, res) =>
  // #swagger.tags = ['ProductComment']
  productCommentController.listProductCommentByProductId(req, res)
);

// CommentLikes
router.post("/insertCommentLike", (req, res) =>
  // #swagger.tags = ['CommentLikes']
  commentLikeController.insertCommentLike(req, res)
);

router.get("/countCommentLikes/:productCommentId", (req, res) =>
  // #swagger.tags = ['CommentLikes']
  commentLikeController.countCommentLikes(req, res)
);

// Purchase
router.post("/purchase", (req, res) =>
  // #swagget.tags = ['Purchase']
  purchaseController.insertPurchase(req, res)
);

// ProductImage

router.get('/getProductImagesByProductId/:productId', (req, res) =>
  productImageController.getProductImagesByProductId(req, res)
);

router.post("/uploadImage", upload.single("pic"), (req, res, file) =>
  productImageController.uploadImage(req, res)
);

// Address
router.post('/insertAddress', (req, res) =>
  // #swagger.tags = ['Address']
  addressController.insertAddress(req, res)
)

router.get('/listAddressesByUser/:userId', (req, res) =>
  // #swagger.tags = ['Address']
  addressController.listAddressesByUser(req, res)
)

router.put('/updateAddressByField', (req, res) =>
  // #swagger.tags = ['Address']
  addressController.updateAddressByField(req, res)
)

router.put('/turnMainAddress', (req, res) =>
  // #swagger.tags = ['Address']
  addressController.turnMainAddress(req, res)
)

router.delete('/deleteAddress', (req, res) =>
  // #swagger.tags = ['Address']
  addressController.deleteAddress(req, res)
)

// Security
router.get('/generateToken/:userId/:email/:key', (req, res)=>
// #swagger.tags = ['Security']
  securityController.generateToken(req,res)
)

// Swagger 
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports = router;
