const Customer = require("../models/customer")
const { Bills, insertBill } = require("../models/bill");
const styles = require('../helpers/stylesheetsConfig');
const scripts = require('../helpers/javascriptConfig');

const homeController = {
    renderCustomerManagePage: async (req, res) => {
        try {
            let customers = await Customer.find({}).exec();
            let arr = [];

            customers.forEach(element => {
                arr.push({
                    id: element.id,
                    phone: element.phone,
                    name: element.name,
                    address: element.address,
                });
            });
            res.render("customerTable", {
                pathIsLevelTwo: false,
                stylesheets: styles.tableCSS,
                javascripts: scripts.tableJS,
                customersData: arr
            });
        } catch (error) {
            res.render("error", { error: error, layout: false })
        }
    },
    viewAllOrderOfAUserByID: async (req, res) => {
        try {
            const allBill = await Bills.find({ customer: req.params.id });
            res.status(200).send(JSON.stringify(allBill))
        } catch (error) {
            res.status(500).send("Fail")
        }
    },
    viewDetailAOrderByOrderID: async (req, res) => {
        try {
            console.log(req.params.id)
            const allBill = await Bills.findById(req.params.id);
            console.log(allBill)
            res.status(200).send(JSON.stringify(allBill))
        } catch (error) {
            res.status(500).send("Fail")
        }
    }
}

module.exports = homeController