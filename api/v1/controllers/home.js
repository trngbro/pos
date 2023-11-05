const crypto = require('../helpers/crypto');
const moment = require('moment')
const {Bills, insertBill} = require("../models/bill");
const Products = require("../models/product");

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
    },
    getDataForChart: async (req, res) => {
        try {
            const dateRangeInput = req.body.dateString.split('-');
            const startDate = moment(dateRangeInput[0], 'MMMM D, YYYY').format('YYYY-MM-DD');
            const endDate = moment(dateRangeInput[1], 'MMMM D, YYYY').format('YYYY-MM-DD');

            function generateDateRange(startDate, endDate) {
                const dateRange = [];
                const currentDate = moment(startDate);
        
                while (currentDate.isSameOrBefore(endDate, 'day')) {
                    dateRange.push(currentDate.format('YYYY-MM-DD'));
                    currentDate.add(1, 'day');
                }
        
                return dateRange;
            }

            const dateRange = generateDateRange(startDate, endDate);

            const revenueByDay = {};

            const bills = await Bills.find({});

            bills.forEach((bill) => {
                const billDate = moment(bill.dateCreated).format('YYYY-MM-DD');
        
                if (!revenueByDay[billDate]) {
                    revenueByDay[billDate] = 0;
                }
        
                revenueByDay[billDate] += bill.total;
            });

            const result = dateRange.map((date) => ({
                date: date,
                totalRevenue: revenueByDay[date] || 0,
            }));

            res.status(200).send(JSON.stringify(result))
        } catch (error) {
            res.status(500).send("Fail")
            
        }  
    },
    getDashboardData: async (req, res) => {
        try {
            const bills = await Bills.find({})

            const currentDate = new Date();

            const startOfDay = moment(currentDate).startOf('day');
            const endOfDay = moment(currentDate).endOf('day');     
            
            const dailyBills = await Bills.find({
                dateCreated: { $gte: startOfDay, $lte: endOfDay },
            });
            const dailyAmount = dailyBills.reduce((total, bill) => total + bill.total, 0);

            const startOfMonth = moment(currentDate).startOf('month');
            const endOfMonth = moment(currentDate).endOf('month');

            const monthlyBills = await Bills.find({
                dateCreated: { $gte: startOfMonth, $lte: endOfMonth },
            });

            const monthlyAmount = monthlyBills.reduce((total, bill) => total + bill.total, 0);

            res.status(200).send(JSON.stringify({totalBills: bills.length, dailyAmount: dailyAmount, monthlyAmount: monthlyAmount, todayBills:dailyBills.length}))
        } catch (error) {
            res.status(500).send("Fail")
        }
    },
    getTheMostSale: async (req, res) => {
        try {
            const bills = await Bills.find({});
            const productSalesMap = {};
            bills.forEach((bill) => {
                bill.products.forEach((product) => {
                  const productId = product.productBarcode;
                  const productQty = parseInt(product.qty) ? parseInt(product.qty) : 1;
              
                  if (productId in productSalesMap) {
                    productSalesMap[productId] += productQty;
                  } else {
                    productSalesMap[productId] = productQty;
                  }
                });
            })
            const sortedProducts = Object.entries(productSalesMap).sort(
                (a, b) => b[1] - a[1]
            );

            const topProducts = sortedProducts.slice(0, 4);

            const resultMap = await Promise.all(
                topProducts.map(async([barcode, qty]) => {
                    const product = await Products.findOne({ barcode: barcode });
                    return [product ? product.name : barcode, qty];
                })
            );

            const otherTotal = sortedProducts.slice(4).reduce(
                (total, [, qty]) => total + qty, 0
            );

            resultMap.push(['Other', otherTotal]);

            res.status(200).send(JSON.stringify(resultMap))
        } catch (error) {
            res.status(500).send("Fail")
        }
    },
    getBestSeller: async (req, res) => {
        try {
            const startDate = moment().startOf('month').format('YYYY-MM-DD');
            const endDate = moment().endOf('month').format('YYYY-MM-DD');
            const bills = await Bills.find({});

            const filteredBills = bills.filter((bill) => {
                return moment(bill.dateCreated).isBetween(startDate, endDate, null, '[]');
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
                saler: saler.split("<<>>")[0],
                totalBills: salerInfo[saler].totalBills,
                totalSales: salerInfo[saler].totalSales,
            }));
            
            res.status(200).send(JSON.stringify(salerArray))
        } catch (error) {
            res.status(500).send("Fail")
        }
    },
}

module.exports = homeController