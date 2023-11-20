const Product = require("../models/product");

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

module.exports = { generateUniqueBarcode }