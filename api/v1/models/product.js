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
    images: {
        type: String,
        required: true,
    },
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
            name: 'Google Pixel 8 Pro',
            images: "test",
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
            images: "test",
            originalPrice: 1000,
            salePrice: 1000,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567890456',
            name: 'Google Pixel 8',
            images: "test",
            originalPrice: 1000,
            salePrice: 900,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567890567',
            name: 'Google Pixel 7 Pro',
            images: "test",
            originalPrice: 1000,
            salePrice: 950,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567890789',
            name: 'Google Pixel 7',
            images: "test",
            originalPrice: 1000,
            salePrice: 900,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567890890',
            name: 'Google Pixel 6 Pro',
            images: "test",
            originalPrice: 800,
            salePrice: 1000,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '123456781233',
            name: 'Google Pixel 6',
            images: "test",
            originalPrice: 700,
            salePrice: 1000,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567894563',
            name: 'Google Pixel 7A',
            images: "test",
            originalPrice: 850,
            salePrice: 1000,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567892343',
            name: 'Google Pixel 6A',
            images: "test",
            originalPrice: 1000,
            salePrice: 700,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567893453',
            name: 'IPhone 15 Pro',
            images: "test",
            originalPrice: 1000,
            salePrice: 950,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567897893',
            name: 'IPhone 15',
            images: "test",
            originalPrice: 1000,
            salePrice: 900,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567895673',
            name: 'IPhone 15 Plus',
            images: "test",
            originalPrice: 1000,
            salePrice: 925,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567898903',
            name: 'IPhone 14',
            images: "test",
            originalPrice: 1000,
            salePrice: 700,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567812323',
            name: 'IPhone 14 Pro',
            images: "test",
            originalPrice: 1000,
            salePrice: 750,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567823423',
            name: 'IPhone 14 Pro Max',
            images: "test",
            originalPrice: 1000,
            salePrice: 850,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567834523',
            name: 'Xperia 1 V',
            images: "test",
            originalPrice: 1000,
            salePrice: 900,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567845623',
            name: 'Xperia 10 V',
            images: "test",
            originalPrice: 1000,
            salePrice: 1000,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567856723',
            name: 'Xperia 5 V',
            images: "test",
            originalPrice: 1000,
            salePrice: 950,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567878923',
            name: 'Xperia 1 IV',
            images: "test",
            originalPrice: 1000,
            salePrice: 800,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234567889023',
            name: 'Xperia 10 IV',
            images: "test",
            originalPrice: 1000,
            salePrice: 850,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234561230123',
            name: 'Xperia 5 IV',
            images: "test",
            originalPrice: 1000,
            salePrice: 800,
            category: phoneCategoryId,
            categoryName: "Phone",
            qty: 1000,
            sold: 1000,
        },
        {
            barcode: '1234562340123',
            name: 'Xperia PRO I',
            images: "test",
            originalPrice: 1000,
            salePrice: 750,
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
