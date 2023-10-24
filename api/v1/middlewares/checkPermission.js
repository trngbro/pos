const crypto = require('../helpers/crypto')
// const styles = require('../helpers/stylesheetsConfig')
// const scripts = require('../helpers/javascriptConfig')

function authuAccount(req, res, next) {
    var userData = req.cookies.userLog;
    if(!userData){
        res.redirect('logout')
    }
    else{
        if(crypto.decode(userData).type == "admin"){
            next();
        }
        else if(crypto.decode(userData).type == "staff"){
            res.redirect('pos');
        }
        else{
            res.redirect('notfound')
        }
    }
}

module.exports = authuAccount;