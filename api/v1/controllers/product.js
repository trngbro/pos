const Categories = require("../models/category");
const Products = require("../models/product");
const generate = require("../helpers/generate");
const styles = require('../helpers/stylesheetsConfig');
const scripts = require('../helpers/javascriptConfig');

const productController = {
    viewAllProducts: async (req, res) => {
        try {
            let products = await Products.find({}).exec();
            let arr = [];

            products.forEach(element => {
                let date = new Date(element.dateCreated);
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
    viewCreateProduct: async (req, res) => {
        try {
            let catagories = await Categories.find({}).exec();
            let arr = [];

            catagories.forEach(element => {
                arr.push({
                    name: element.name,
                    id: element._id
                })
            });
            
            res.render("productForm", {
                pathIsLevelTwo: true,
                stylesheets: styles.formCSS,
                javascripts: scripts.formJS,
                catagoriesData: arr
            })
        } catch (error) {
            res.render("error");
        }
    },
    deleteProduct: async (req, res) => {
        const barcode = req.params.barcode;
        Products.findOneAndDelete({ barcode: barcode })
            .then((product) => {
                if (!product) {
                    res.status(404).send('Product not found.');
                } else {
                    res.status(204).send(); 
                }
            })
            .catch((err) => {
                res.status(500).send('Internal Server Error');
            });
    },
    addProduct: async (req, res) => {
        try {
            const { name, ogprice, saleprice, category, categoryID, base64Image } = req.body;

            const product = new Products({
                barcode: await generate.generateUniqueBarcode(),
                name: name,
                images: base64Image,
                originalPrice: parseInt(ogprice),
                salePrice: parseInt(saleprice),
                categoryName: category,
                category: categoryID,
                qty: 0,
                sold: 0
            });

            await product.save();

            res.status(200).json(product)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    addProductCatchError: (req, res) => {
        try {
            res.status(303).json("Lỗi tải lên");
        } catch (error) {
            res.render("error")
        }
    }
}

module.exports = productController