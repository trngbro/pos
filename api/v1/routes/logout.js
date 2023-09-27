const logoutController = require("../controllers/logout");

const router = require("express").Router();

router.get("/", logoutController.renderLogoutPage);

module.exports = router;