const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

const warehouseController = {
    viewAllDataProductLogs: (req, res) => {
        try {
            res.render("warehouseLogs", {
                pathIsLevelTwo: false,
                stylesheets: styles.tableCSS,
                javascripts: scripts.tableJS
            })
        } catch (error) {
            res.render("error")
        }
    },
    restockProduct: (req, res) => {
        try {
            res.render("warehouseRestock", {
                pathIsLevelTwo: true,
                stylesheets: styles.tableIn2LCSS,
                javascripts: scripts.tableIn2LJS
            })
        } catch (error) {
            res.render("error")
        }
    },
    // Them san pham moi, chua lam
    getLoseProduct: (req, res) => {
        try {
            res.render("warehouseGetLose", {
                pathIsLevelTwo: true,
                stylesheets: styles.formCSS,
                javascripts: scripts.formJS
            })
        } catch (error) {
            res.render("error")
        }
    },
}

module.exports = warehouseController