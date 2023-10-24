const mongoose = require("mongoose");
const Category = require("./category");

async function getCategoryIdByName(categoryName) {
    try {
        const category = await Category.findOne({ name: categoryName });
        if (category) {
            return category._id;
        } else {
            return null;
        }
    } catch (error) {
        console.error("product model fail at getCategoryIDbyName");
        return null;
    }
}

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
    }],
    originalPrice: {
        type: Number,
        required: true,
    },
    salePrice: Number,
    categoryName: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    qty: Number,
    sold: Number,
});

const Product = mongoose.model("Product", productSchema);

const insertSampleProducts = async () => {
    const phoneCategoryId = await getCategoryIdByName("Phone");
    if (!phoneCategoryId) {
        console.error("Category 'Phone' not found.");
        return;
    }

    const sampleProducts = [
        {
            barcode: '0987654321123',
            name: 'Gooogle Pixel 8 Pro',
            images: ['image1.jpg', 'image2.jpg'],
            originalPrice: 1111,
            salePrice: 1111,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1001,
            sold: 1111,
        },
        {
            barcode: '1234567890123',
            name: 'IPhone 15 Pro Max',
            images: ['image3.jpg', 'image4.jpg'],
            originalPrice: 1000,
            salePrice: 1000,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        }
    ];

    try {
        await Product.insertMany(sampleProducts);
        console.log("Product data are inserted");
    } catch (error) {
        console.log("Has error/ or data was had before at product model");
    }
};

insertSampleProducts();

module.exports = Product;
