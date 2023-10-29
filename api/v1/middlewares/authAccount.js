const crypto = require('../helpers/crypto');

function authuAccount(req, res, next) {
    var userData = req.cookies.userLog;
    if(!userData){
        res.redirect('logout');
    }
    else{
        if(crypto.decode(userData).status == "active"){
            next();
        }
        else if(crypto.decode(userData).status == 'noaccess'){
            res.redirect('/login/verify');
        }
        else if(crypto.decode(userData).status == 'block'){
            res.redirect('/blocking');
        }
        else{
            res.redirect('notfound');
        }
    }
};

module.exports = authuAccount;