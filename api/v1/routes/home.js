const home = require('../controllers/home')

const router = require("express").Router();

router.get("/", home.rederHomepage);

module.exports = router