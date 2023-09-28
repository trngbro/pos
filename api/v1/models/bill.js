const mongoose = require("mongoose");


// Bill model
const billSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
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
    payment: {
        type: Number,
        required: true,
    },
    return: {
        type: Number,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Bill", billSchema);
