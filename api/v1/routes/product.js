const productController = require("../controllers/product");

const router = require("express").Router();

router.get("/", productController.viewAllProducts);
router.get("/create", productController.viewCreateProduct);
router.post("/create", productController.addProduct);

module.exports = router;