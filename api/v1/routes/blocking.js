const router = require("express").Router();

router.get("", function (req, res) {
    res.render("blocking", {
        layout: false
    });
});

module.exports = router;