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

const Customer =  mongoose.model("Customer", customerSchema);

const sampleCustomers = [
    {
      phone: "0947605644",
      name: "Nguyễn Trung Nghĩa",
      address: "29 Đường 81, Phường Tân Quy, Quận 7, Hồ Chí MInh",
      history: []
    },
    {
      phone: "094456789",
      name: "Phạm Nhật Vượng",
      address: "Landmark 81, Quận Bình Thạnh, Hồ Chí MInh",
      history: []
    }
];

Customer.insertMany(sampleCustomers)
    .then(() => {
        console.log("Customers data are inserted.");
    })
    .catch((error) => {
        console.log("Has error/ or data was had before at customers model");
    });

module.exports = Customer