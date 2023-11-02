const userControllers = require("../controllers/user")

const router = require("express").Router();

/* GET users listing. */
router.get('', userControllers.getUserInfo);
router.post('/changePassword', userControllers.changePassword);

module.exports = router;
