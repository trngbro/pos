const staff = require('../controllers/staff')

const router = require("express").Router();

router.get("/", staff.viewAllStaffByList);
router.get("/newStaff", staff.createANewStaff);
router.get("/newManager", staff.createANewManager);

module.exports = router