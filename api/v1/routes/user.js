const userControllers = require("../controllers/user")

const router = require("express").Router();

/* GET users listing. */
router.get('', userControllers.getUserInfo);
router.post('/changePassword', userControllers.changePassword);
router.post('/changeImage', userControllers.changeImage);

module.exports = router;
