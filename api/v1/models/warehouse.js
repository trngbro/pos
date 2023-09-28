const mongoose = require("mongoose");

// Warehouse model
const warehouseSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    qty: String,
    lastUpdate: Date,
    lastSale: Date,
    status: String,
});

module.exports =  mongoose.model("Warehouse", warehouseSchema);