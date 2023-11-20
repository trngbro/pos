const mongoose = require("mongoose");

// Importing model
const importingSchema = new mongoose.Schema({
    product: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        qty: String,
    },],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    status: Boolean,
});

module.exports = mongoose.model("Importing", importingSchema);
