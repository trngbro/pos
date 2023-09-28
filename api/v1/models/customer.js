const mongoose = require("mongoose");

// Customer model
const customerSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: String,
    history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill",
    }, ],
});

module.exports =  mongoose.model("Customer", customerSchema);