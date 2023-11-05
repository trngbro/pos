const crypto = require('../helpers/crypto');
const moment = require('moment')
const {Bills, insertBill} = require("../models/bill");

const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

const homeController = {
    rederHomepage: (req, res) => {
        res.render("home", {
            pathIsLevelTwo: false,
            stylesheets: styles.homeCSS,
            javascripts: scripts.homeJS
        })      
    },
    getRevenuesOnPickedTime: async (req, res) => {
        try {
            const dateRange = req.body.dateString.split('-');
            const startDate = moment(dateRange[0], 'MMMM D, YYYY').format('YYYY-MM-DD');
            const endDate = moment(dateRange[1], 'MMMM D, YYYY').format('YYYY-MM-DD');

            const bills = await Bills.find({});

            const filteredBills = bills.filter((bill) => {
                return moment(bill.dateCreated).isBetween(moment(startDate), moment(endDate).add(1, 'day'), null, '[]');
            });
            res.status(200).send(JSON.stringify(filteredBills))
        } catch (error) {
            res.status(500).send("Fail")
            
        }  
    },
    getSalerOnPickedTime: async (req, res) => {
        try {
            const dateRange = req.body.dateString.split('-');
            const startDate = moment(dateRange[0], 'MMMM D, YYYY').format('YYYY-MM-DD');
            const endDate = moment(dateRange[1], 'MMMM D, YYYY').format('YYYY-MM-DD');

            const bills = await Bills.find({});

            const filteredBills = bills.filter((bill) => {
                return moment(bill.dateCreated).isBetween(moment(startDate), moment(endDate).add(1, 'day'), null, '[]');
            });

            const salerInfo = {};

            filteredBills.forEach((bill) => {
                const saler = bill.saler;
    
                if (!salerInfo[saler]) {
                    salerInfo[saler] = {
                        totalBills: 1,
                        totalSales: bill.total,
                    };
                } else {
                    salerInfo[saler].totalBills++;
                    salerInfo[saler].totalSales += bill.total;
                }
            });

            const salerArray = Object.keys(salerInfo).map((saler) => ({
                saler: saler,
                totalBills: salerInfo[saler].totalBills,
                totalSales: salerInfo[saler].totalSales,
            }));

            res.status(200).send(JSON.stringify(salerArray))
        } catch (error) {
            res.status(500).send("Fail")
            
        }  
    }
}

module.exports = homeController