const pos = require('../controllers/pos')

const router = require("express").Router();

router.get("/", pos.renderPOSPage);

module.exports = router