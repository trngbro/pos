const pos = require('../controllers/pos');
const isLogin = require('../middlewares/authAccount');

const router = require("express").Router();

router.get("/", isLogin, pos.renderPOSPage);
router.post("/findUser", isLogin, pos.payloadCustomer);
router.post("/makeReciept", isLogin, pos.makeANewReciept);

module.exports = router