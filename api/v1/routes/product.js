const productController = require("../controllers/product");
const formValidate = require('../middlewares/validator');

const router = require("express").Router();

router.get("/", productController.viewAllProducts);
router.delete("/:barcode", productController.deleteProduct);
router.get("/create", productController.viewCreateProduct);
router.post("/create", formValidate, productController.addProduct);
router.post("/create", productController.addProductCatchError);

module.exports = router; 