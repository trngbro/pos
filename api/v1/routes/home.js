const home = require('../controllers/home')

const authuAccount = require("../middlewares/authAccount")

const router = require("express").Router();

router.get("/", authuAccount, home.rederHomepage);

module.exports = router