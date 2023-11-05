const home = require('../controllers/home');

const router = require("express").Router();

router.get("/", home.rederHomepage);
router.post("/getRevenuesOnPickedTime", home.getRevenuesOnPickedTime);
router.post("/getSalerOnPickedTime", home.getSalerOnPickedTime);

module.exports = router