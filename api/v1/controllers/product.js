const Categories = require("../models/category")
const Products = require("../models/product")
const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

const productController = {
    viewAllProducts: async (req, res) => {
        try {
            let products = await Products.find({}).exec();
            let arr = []

            products.forEach(element => {
                let date = new Date(element.dateCreated)
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;

                console.log(formattedDate);
                arr.push({
                    barcode: element.barcode,
                    name: element.name,
                    images: element.images,
                    originalPrice: element.originalPrice,
                    dateCreated: formattedDate,
                    salePrice: element.salePrice,
                    categoryName: element.categoryName,
                    qty: element.qty,
                    sold: element.sold,
                })
            });

            res.render("productTable", {
                pathIsLevelTwo: false,
                stylesheets: styles.tableCSS,
                javascripts: scripts.tableJS,
                productTableData: arr
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