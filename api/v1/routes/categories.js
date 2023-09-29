const categoriesRoute = require("../controllers/categories");

const router = require("express").Router();

router.get("/", categoriesRoute.viewAllCatagories);
router.get("/create", categoriesRoute.viewCreateCaterory);
router.post("/create", categoriesRoute.addCaterory);

module.exports = router;