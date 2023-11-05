const Products = require("../models/product");
const Customers = require("../models//customer");
const { Bills, insertBill } = require("../models/bill");

const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig');

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
    },

    payloadCustomer: async (req, res) => {
        try {
            const phoneNumber = req.body.phone;
            const customer = await Customers.findOne({ phone: phoneNumber });
            if (customer) {
                res.status(200).json({ name: customer.name, phone: customer.phone });
            } else {
                res.status(204).json({ name: null });
            }
        } catch (error) {
            res.status(404).json({ name: "Not found customer" });
        }   
    },

    makeANewReciept: async (req, res) => {
        try {
            const {products, totalAmount, customerPhone, userLogs} = req.body;

            await insertBill(JSON.parse(products), customerPhone, userLogs);

            console.log(products)

            JSON.parse(products).forEach(async product => {
                const temp = await Products.findOne({barcode: product.product_id})
                const newQty = parseInt(temp.qty) - parseInt(product.quantity)
                const newSold = parseInt(temp.sold) + parseInt(product.quantity)
                await Products.findByIdAndUpdate(temp._id, {qty: newQty, sold: newSold})
            })

            res.status(200);
        } catch (error) {
            res.status(404).json({ name: "Not found customer" });
        }   
    },

    addCustomerIfNotExist: async (req, res) => {
        try {
            const customer = new Customers({
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address
            })

            await customer.save();
            
            res.status(200).send("Successed")
        } catch (error) {
            res.status(400).send("{error}")
        }
    },

    getProductByBarcode: async (req, res) => {
        try {
            const value = await Products.findOne({barcode:req.body.barcode})
            if(value){
                res.status(200).send(JSON.parse(value));
            }
            else {
                res.status(404).send("Notfound");
            }
        } catch (error) {
            res.status(400).send("{error}")
        }
    }
}

module.exports = posControllers