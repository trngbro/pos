const mongoose = require("mongoose");

// Product model
const productSchema = new mongoose.Schema({
    barcode: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }, ],
    originalPrice: {
        type: String,
        required: true,
    },
    salePrice: Number,
    category: Number,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    qty: Number,
    sold: Number,
});

module.exports =  mongoose.model("Product", productSchema);