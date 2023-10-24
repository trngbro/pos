const Products = require("../models/product")

const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

const posControllers = {
    renderPOSPage: async (req, res) => {
        try {
            let products = await Products.find({}).exec();
            let arr = []

            products.forEach(element => {
                let date = new Date(element.dateCreated)
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;

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
                    date: date
                })
            });

            res.render('main_pos', {
                pathIsLevelTwo: false,
                stylesheets: styles.point_of_sale,
                javascripts: scripts.point_of_sale,
                layout: false,
                productTableData: arr
            })
        } catch (error) {
            res.render('error')
        }   
    }
}

module.exports = posControllers