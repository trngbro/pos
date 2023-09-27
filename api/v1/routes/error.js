const errorPage = require('../controllers/error')

const router = require("express").Router();

router.get("/403", errorPage.page403);
router.get("/404", errorPage.page404);
router.get("/500", errorPage.page500);