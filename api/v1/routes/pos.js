const pos = require('../controllers/pos');
const isLogin = require('../middlewares/authAccount');

const router = require("express").Router();

router.get("/", isLogin, pos.renderPOSPage);
router.post("/findUser", isLogin, pos.payloadCustomer);

module.exports = router