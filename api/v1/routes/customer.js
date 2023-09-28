const customer = require('../controllers/customer')

const router = require("express").Router();

router.get("/", customer.renderCustomerManagePage);

module.exports = router