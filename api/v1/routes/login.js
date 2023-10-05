const loginController = require("../controllers/login");
const authuAccount = require("../middlewares/authAccount")

const router = require("express").Router();

router.get("/", loginController.rederLoginPage);
router.post("", loginController.loginChecking);
router.post("/identify", loginController.identifyUser)
router.put("/identify", loginController.resetAccount)

module.exports = router;