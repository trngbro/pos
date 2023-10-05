const crypto = require('../helpers/crypto')

function authuAccount(req, res, next) {
    var userData = req.cookies.userLog;
    if(crypto.decode(userData).status === 'block'){
        res.render('noauth')
    }
    if(crypto.decode(userData).status === 'active'){
        next();
    }
}

module.exports = authuAccount;