const loginController = require("../controllers/login");
const isAdmin = require("../middlewares/authAccount")

const router = require("express").Router();

router.get("/", loginController.rederLoginPage);
router.post("", loginController.loginChecking);
router.post("/identify", isAdmin, loginController.identifyUser);
router.get("/identify/:id/:token", loginController.verifyAccount, loginController.firstChangePassword);
router.put("/identify", loginController.resetAccount)

module.exports = router;