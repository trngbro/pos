const localStorage = require('localStorage');

const logoutController = {
    renderLogoutPage: (req, res) => {
        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
        }
        var lc_user = localStorage.getItem("user");
        if(lc_user != null)
            localStorage.clear()
        res.render('login')
    }
}

module.exports = logoutController