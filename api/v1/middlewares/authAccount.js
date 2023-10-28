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
            res.render('401');
        }
        else if(crypto.decode(userData).status == 'block'){
            res.render('403');
        }
        else{
            res.redirect('notfound');
        }
    }
};

module.exports = authuAccount;