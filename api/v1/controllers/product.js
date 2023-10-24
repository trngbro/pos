const Categories = require("../models/category")
const Products = require("../models/product")
const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

const productController = {
    viewAllProducts: async (req, res) => {
        try {
            const products = await Products.find({}).exec();
            console.log(typeof(JSON.stringify(products)))
            res.render("productTable", {
                pathIsLevelTwo: false,
                stylesheets: styles.tableCSS,
                javascripts: scripts.tableJS,
                productTableData: (products)
            });
        } catch (error) {
          res.render("error");
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