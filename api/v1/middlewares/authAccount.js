const localStorage = require("../helpers/localStorageSupport")

function authuAccount(req, res, next) {
    if(localStorage.checkItemExist("user"))
        next();
    else
        res.redirect('/login');
}

module.exports = authuAccount;