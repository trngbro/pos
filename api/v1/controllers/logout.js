const localStorageSupport = require('../middlewares/localStorageSupport');

const logoutController = {
    renderLogoutPage: (req, res) => {
        localStorageSupport.clearItemExist("user");
        res.redirect('./login')
    }
}

module.exports = logoutController