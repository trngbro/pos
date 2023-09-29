const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

const productController = {
    viewAllProducts: (req, res) => {
        try {
            res.render("productTable", {
                pathIsLevelTwo: false,
                stylesheets: styles.tableCSS,
                javascripts: scripts.tableJS
            })
        } catch (error) {
            res.render("error")
        }
    },
    viewCreateProduct: (req, res) => {
        try {
            res.render("productForm", {
                pathIsLevelTwo: true,
                stylesheets: styles.formCSS,
                javascripts: scripts.formJS
            })
        } catch (error) {
            res.render("error")
        }
    },
    // Them san pham moi, chua lam
    addProduct: (req, res) => {
        try {
            res.render("productForm", {
                pathIsLevelTwo: true,
                stylesheets: styles.formCSS,
                javascripts: scripts.formJS
            })
        } catch (error) {
            res.render("error")
        }
    },
}

module.exports = productController