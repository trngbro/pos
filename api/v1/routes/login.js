const loginController = require("../controllers/login");

const router = require("express").Router();

router.get("/", loginController.rederLoginPage);
router.post("", loginController.loginChecking);

module.exports = router;