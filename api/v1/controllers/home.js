const crypto = require('../helpers/crypto')

const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

const homeController = {
    rederHomepage: (req, res) => {
        res.render("home", {
            pathIsLevelTwo: false,
            stylesheets: styles.homeCSS,
            javascripts: scripts.homeJS
        })      
    }
}

module.exports = homeController