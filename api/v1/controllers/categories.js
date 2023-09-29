const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

const categoriesController = {
    viewAllCatagories: (req, res) => {
        try {
            res.render("categoriesTable", {
                pathIsLevelTwo: false,
                stylesheets: styles.tableCSS,
                javascripts: scripts.tableJS
            })
        } catch (error) {
            res.render("error")
        }
    },
    viewCreateCaterory: (req, res) => {
        try {
            res.render("categoriesForm", {
                pathIsLevelTwo: true,
                stylesheets: styles.formCSS,
                javascripts: scripts.formJS
            })
        } catch (error) {
            res.render("error")
        }
    },
    // Them san pham moi, chua lam
    addCaterory: (req, res) => {
        try {
            res.render("categoriesForm", {
                pathIsLevelTwo: true,
                stylesheets: styles.formCSS,
                javascripts: scripts.formJS
            })
        } catch (error) {
            res.render("error")
        }
    },
}

module.exports = categoriesController