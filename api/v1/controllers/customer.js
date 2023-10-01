const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

const homeController = {
    renderCustomerManagePage: (req, res) => {
        try {
            res.render("customerTable", {
                pathIsLevelTwo: false,
                stylesheets: styles.tableCSS,
                javascripts: scripts.tableJS
            })
        } catch (error) {
            res.render("error", {error: error, layout: false})
        }
    }
}

module.exports = homeController