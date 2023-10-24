const home = require('../controllers/home')
const isLogin = require('../middlewares/authAccount')
const isAdmin = require('../middlewares/checkPermission')

const router = require("express").Router();

router.get("/", isLogin, isAdmin, home.rederHomepage);

module.exports = router