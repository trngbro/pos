const localStorage = require('localStorage');

const logoutController = {
    renderLogoutPage: (req, res) => {
        var arr = new Array();
        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
        }
        var lc_user = localStorage.getItem("user");
        if(lc_user != null)
            arr = [];
        res.render('index', {title: "Logout successed"})
    }
}

module.exports = logoutController