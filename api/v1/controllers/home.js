const crypto = require('../helpers/crypto')

const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

const homeController = {
    rederHomepage: (req, res) => {
        if(!req.cookies.userLog) {
            res.redirect('login');
        }
        else{
            res.render("home", {
                pathIsLevelTwo: false,
                stylesheets: styles.homeCSS,
                javascripts: scripts.homeJS
            })
        }       
    }
}

module.exports = homeController