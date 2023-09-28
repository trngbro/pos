const mongoose = require("mongoose");

// Category model
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }, ],
    image: {
        type: String,
        default: "abc",
    },
});

module.exports = mongoose.model("Category", categorySchema);