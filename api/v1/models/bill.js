const mongoose = require("mongoose");
const Customer = require("./customer");


async function getCustomerIDFromPhoneNumber(phoneNumber) {
    try {
        const someone = await Customer.findOne({ phone: phoneNumber });
        if (someone) {
            return someone._id;
        } else {
            return null;
        }
    } catch (error) {
        console.error("bill model fail at getCustomerIDFromPhoneNumber");
        return null;
    }
}

async function insertBill(products, phoneNumber) {
    try {
        const customerID = await getCustomerIDFromPhoneNumber(phoneNumber);
        if (!customerID) {
            console.error("Customer not found for phone number: ", phoneNumber);
            return false;
        }

        const transformedProducts = products.map((product) => {
            return {
                productBarcode: product.product_id,
                qty: product.qty,
            };
        });

        const total = products.reduce((acc, product) => {
            return acc + parseFloat(product.quantity) * parseFloat(product.subprice);
        }, 0);

        // Create a new bill document
        const newBill = new Bills({
            customer: customerID,
            products: transformedProducts,
            total: total,
            paymentType: "Cash"
        });

        // Save the bill to the database
        await newBill.save();

        return true;
    } catch (error) {
        return false;
    }
}


// Bill model
const billSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true, // Đảm bảo mỗi hóa đơn đều có khách hàng tương ứng
    },
    products: [{
        productBarcode: String,
        qty: String,
    }, ],
    total: {
        type: Number,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
        default: "Cash"
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

const Bills = mongoose.model("Bill", billSchema);

const insertSampleBills = async () => {
    const sampleCustomerID = await getCustomerIDFromPhoneNumber("0947605644");
    if (!sampleCustomerID) {
        console.error("Bill 'customer' not found.");
        return;
    }

    const sampleBills = [
        {
            customer: sampleCustomerID,
            products: [
                { productBarcode: '0987654321123', qty: 2 },
                { productBarcode: '1234561230123', qty: 3 },
            ],
            total: 500,
        },
        {
            customer: sampleCustomerID,
            products: [
                { productBarcode: '1234561230123', qty: 1 },
            ],
            total: 150,
        },
    ];

    try {
        await Bills.insertMany(sampleBills);
        console.log("Bills data are inserted");
    } catch (error) {
        console.log("Has error/ or data was had before at bills model");
    }
}

insertSampleBills();

module.exports = {Bills, insertBill};
