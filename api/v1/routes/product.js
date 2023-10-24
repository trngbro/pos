const productController = require("../controllers/product");
const isLogin = require('../middlewares/authAccount');
const isAdmin = require('../middlewares/checkPermission');

const router = require("express").Router();

router.get("/", productController.viewAllProducts);
router.get("/create", productController.viewCreateProduct);
router.post("/create", productController.addProduct);

module.exports = router; 