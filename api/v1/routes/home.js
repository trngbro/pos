const home = require('../controllers/home')

const router = require("express").Router();

router.get("/", home.rederHomepage);
router.get("/customer", home.rederCustomerManagePage);

module.exports = router