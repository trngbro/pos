const revenuesRouter = require("../controllers/revenues");
const isLogin = require('../middlewares/authAccount');
const isAdmin = require('../middlewares/checkPermission');

const router = require("express").Router();

router.use("", isLogin, isAdmin);
router.get("/", revenuesRouter.viewAllRevenues);

module.exports = router;