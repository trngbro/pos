const { body, validationResult } = require('express-validator');
const Product = require('../models/product'); // Import model Product
const Category = require('../models/category'); // Import model Category

// Hàm tạo barcode ngẫu nhiên với 13 chữ số
async function generateUniqueBarcode() {
    let uniqueBarcode;
    let isDuplicate = true;
  
    while (isDuplicate) {
      // Tạo một số ngẫu nhiên có 13 chữ số
      const randomBarcode = Math.floor(1000000000000 + Math.random() * 9000000000000).toString();
  
      // Kiểm tra xem số này đã tồn tại trong bảng 'product' chưa
      const existingProduct = await Product.findOne({ barcode: randomBarcode });
  
      if (!existingProduct) {
        isDuplicate = false;
        uniqueBarcode = randomBarcode;
      }
    }
  
    return uniqueBarcode;
  }

// Hàm lấy danh sách tên category hợp lệ
async function getValidCategoryNames() {
    try {
        const categories = await Category.find({}, 'name');
        return categories.map((category) => category.name);
    } catch (error) {
        throw error;
    }
}

// Middleware xác thực và xử lý việc thêm sản phẩm
function validateFormProduct(req, res, next) {
    getValidCategoryNames()
    .then((validCategoryNames) => {
        const { name, ogprice, saleprice, catagory, base64Image } = req.body;

        if (!validCategoryNames.includes(catagory)) {
            console.log("ca")
            next('route')
        }
        if(! typeof ogprice === 'number'){
            console.log("og")
            next('route')
        }
        if(!typeof saleprice === 'number'){
            console.log("sp")
            next('route')
        }
        if(!base64Image.startsWith("data:image/jpeg;base64")){
            console.log("64")
            next('route')
        }

        next();
    })
    .catch((error) => {
        throw error;
    });
}

module.exports = validateFormProduct;