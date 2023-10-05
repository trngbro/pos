const crypto = require('../helpers/crypto')
const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

function authuAccount(req, res, next) {
    var userData = req.cookies.userLog;
    if(!userData){
        res.redirect('logout')
    }
    else{
        if(crypto.decode(userData).status == 'block'){
            console.log(crypto.decode(userData).status == 'block')
            res.render('noauth', {
                pathIsLevelTwo: false,
                stylesheets: styles.homeCSS,
                javascripts: scripts.homeJS
            })
        }
        else if(crypto.decode(userData).status == 'active'){
            next();
        }
        else {
            res.render("401", {
                layout: false
            })
        }
    }
}

module.exports = authuAccount;