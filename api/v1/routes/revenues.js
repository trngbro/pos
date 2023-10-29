const revenuesRouter = require("../controllers/revenues");

const router = require("express").Router();

router.get("/", revenuesRouter.viewAllRevenues);

module.exports = router;