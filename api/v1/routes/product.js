const productController = require("../controllers/product");
const isLogin = require('../middlewares/authAccount');
const isAdmin = require('../middlewares/checkPermission');
const formValidate = require('../middlewares/validator');

const router = require("express").Router();

router.use("", isLogin, isAdmin);
router.get("/", productController.viewAllProducts);
router.delete("/:barcode", productController.deleteProduct);
router.get("/create", productController.viewCreateProduct);
router.post("/create", formValidate, productController.addProduct);
router.post("/create", productController.addProductCatchError);

module.exports = router; 