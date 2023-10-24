const mongoose = require("mongoose");

// Category model
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: "abc",
    },
});

const Category = mongoose.model("Category", categorySchema);

const sampleCategories = [
    {
        name: "Phone",
        image: "",
    },
    {
        name: "Laptop",
        image: "clothing.jpg",
    }
];

Category.insertMany(sampleCategories)
    .then(() => {
        console.log("Categories data are inserted.");
    })
    .catch((error) => {
        console.log("Has error/ or data was had before at categories model");
    });

module.exports = Category;