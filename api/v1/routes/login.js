const loginController = require("../controllers/login");
const isAdmin = require("../middlewares/authAccount");

const router = require("express").Router();

router.get("/", loginController.rederLoginPage);
router.post("", loginController.loginChecking);
router.get("/verify", loginController.renderPage);
router.post("/identify", isAdmin, loginController.identifyUser);        //tạo tài khoản mới
router.get("/identify/:id/:token", loginController.verifyAccount, loginController.firstChangePassword);     //xác minh tài khoản mới và bắt đổi mật khẩu
router.put("/identify", loginController.resetAccount)   //đổi mật khẩu và đổi trạng thái
router.post("/forgetPwd", loginController.changePasswordIfForgot);   //gửi link đổi mật khẩu  
router.get("/resetPassword/:id/:token", loginController.verifyAccount, loginController.changePassword);     //xác minh tài khoản và đổi mật khẩu

module.exports = router;