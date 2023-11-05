const customer = require('../controllers/customer')

const router = require("express").Router();

router.get("/", customer.renderCustomerManagePage);
router.get("/:id", customer.viewAllOrderOfAUserByID);
router.get("/detail/:id", customer.viewDetailAOrderByOrderID);

module.exports = router