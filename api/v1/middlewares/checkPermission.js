const crypto = require('../helpers/crypto')
const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

function checkPermission(req, res, next) {
    var userData = req.cookies.userLog;
    if(crypto.decode(userData).type === 'admin'){
        next()
    }
    if(crypto.decode(userData).type === 'staff'){
        res.redirect('pos')
    }
    else {
        res.render("401", {
            layout: false
        })
    }
}

module.exports = checkPermission;