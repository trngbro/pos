const pos = require('../controllers/pos');

const router = require("express").Router();

router.get("/", pos.renderPOSPage);
router.post("/findUser", pos.payloadCustomer);
router.post("/makeReciept", pos.makeANewReciept);

module.exports = router