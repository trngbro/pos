const Category = require('../models/category');

async function getCategoryIdFromName(category) {
    try {
        const foundCategory = await Category.findOne({
            name: category
        }, '_id');
        return foundCategory ? foundCategory._id : null;
    } catch (error) {
        throw error;
    }
}

function validateFormProduct(req, res, next) {
    const {
        name,
        ogprice,
        saleprice,
        category,
        base64Image
    } = req.body;
    getCategoryIdFromName(category)
        .then((validCategoryNames) => {
            if (validCategoryNames == null) {
                next('route');
            } else if (!/^-?\d*\.?\d+$/.test(ogprice)) {
                next('route');
            } else if (!/^-?\d*\.?\d+$/.test(saleprice)) {
                next('route');
            } else if (!base64Image.startsWith("data:image/jpeg;base64")) {
                next('route');
            } else {
                req.body = {
                    ...req.body,
                    categoryID: validCategoryNames
                };
                next();
            }
        })
        .catch((error) => {
            throw error;
        });
}

module.exports = validateFormProduct;