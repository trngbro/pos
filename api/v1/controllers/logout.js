const localStorageSupport = require('../helpers/localStorageSupport');

const logoutController = {
    renderLogoutPage: (req, res) => {
        localStorageSupport.clearItemExist("user");
        res.redirect('./login')
    }
}

module.exports = logoutController