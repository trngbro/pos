const home = require('../controllers/home');

const router = require("express").Router();

router.get("/", home.rederHomepage);
router.get("/getUserData", home.getUserData);
router.get("/getDashboardData", home.getDashboardData);
router.get("/getTheMostSale", home.getTheMostSale);
router.get("/getBestSeller", home.getBestSeller);
router.post("/getRevenuesOnPickedTime", home.getRevenuesOnPickedTime);
router.post("/getSalerOnPickedTime", home.getSalerOnPickedTime);
router.post("/getDataForChart", home.getDataForChart);

module.exports = router