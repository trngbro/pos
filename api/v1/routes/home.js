const home = require('../controllers/home')

const authuAccount = require("../middlewares/authAccount")
const checkPermission = require("../middlewares/checkPermission")

const router = require("express").Router();

router.get("/", authuAccount, checkPermission, home.rederHomepage);

module.exports = router