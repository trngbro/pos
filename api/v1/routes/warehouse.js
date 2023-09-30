const warehouseController = require("../controllers/warehouse");

const router = require("express").Router();

router.get("/", warehouseController.viewAllDataProductLogs);
router.get("/restock", warehouseController.restockProduct);
router.post("/lose", warehouseController.getLoseProduct);

module.exports = router;