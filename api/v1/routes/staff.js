const staff = require('../controllers/staff')

const router = require("express").Router();

router.get("/", staff.viewAllStaffByList);
router.get("/newStaff", staff.createANewStaff);
router.get("/newManager", staff.createANewManager);
router.post("/toggleStatus", staff.toggleStatus);
router.post("/resendLink", staff.resendVerify);

module.exports = router