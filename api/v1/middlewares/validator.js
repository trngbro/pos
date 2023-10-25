const Category = require('../models/category'); 

async function getCategoryIdFromName(category) {
    try {
        const foundCategory = await Category.findOne({ name: category }, '_id');
        return foundCategory ? foundCategory._id : null;
    } catch (error) {
        throw error;
    }
}

function validateFormProduct(req, res, next) {
    const { name, ogprice, saleprice, category, base64Image } = req.body;
    getCategoryIdFromName(category)
        .then((validCategoryNames) => {
            console.log(validCategoryNames)
            console.log(category)
            if (validCategoryNames == null) {
                console.log("1")
                next('route');
            } else if(! /^-?\d*\.?\d+$/.test(ogprice)){
                console.log("2")
                next('route');
            } else if(! /^-?\d*\.?\d+$/.test(saleprice)){
                console.log("3")
                next('route');
            } else if(! base64Image.startsWith("data:image/jpeg;base64")){
                console.log("4")
                next('route');
            } else {
                req.body = {
                    ...req.body,
                    categoryID: validCategoryNames
                };
                next();
            }
        }
    )
    .catch((error) => {
        throw error;
    });
}

module.exports = validateFormProduct;