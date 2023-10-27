const { Bills } = require("../models/bill");
const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

const revenuesController = {
    viewAllRevenues: async (req, res) => {
        try {
            let bills = await Bills.find({}).exec();
            let arr = [];

            bills.forEach(element => {
                let date = new Date(element.dateCreated);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;

                arr.push({
                    customer: element.customer,
                    products: element.products,
                    total: element.total,
                    paymentType: element.paymentType,
                    dateCreated: formattedDate,
                    date: date,
                    ssn: element._id,
                    saler: element.saler
                })
            });

            res.render("revenuesTable", {
                pathIsLevelTwo: false,
                stylesheets: styles.tableCSS,
                javascripts: scripts.tableJS,
                billsTableData: arr
            });
        } catch (error) {
            res.render("error");
        }
    }
}

module.exports = revenuesController;