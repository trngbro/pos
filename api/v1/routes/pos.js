const pos = require('../controllers/pos');

const router = require("express").Router();

router.get("/", pos.renderPOSPage);
router.post("/getProductByBarcode", pos.getProductByBarcode);
router.post("/findUser", pos.payloadCustomer);
router.post("/addCustomer", pos.addCustomerIfNotExist);
router.post("/makeReciept", pos.makeANewReciept);

module.exports = router