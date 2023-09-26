const mongoose = require("mongoose");

// User model
const userSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: true,
        unique: true,
    },
    user: String,
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "block",
    },
    type: {
        type: String,
        default: "staff",
    },
    image: {
        type: String,
        default: "./public/images/default.png",
    },
});

const User = mongoose.model("User", userSchema);

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

const Product = mongoose.model("Product", productSchema);

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

const Category = mongoose.model("Category", categorySchema);

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

const Customer = mongoose.model("Customer", customerSchema);

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

const Bill = mongoose.model("Bill", billSchema);

// Importing model
const importingSchema = new mongoose.Schema({
    product: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        qty: String,
    }, ],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    status: Boolean,
});

const Importing = mongoose.model("Importing", importingSchema);

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

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = {
    User,
    Product,
    Category,
    Customer,
    Bill,
    Importing,
    Warehouse,
};