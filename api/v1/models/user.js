const mongoose = require('mongoose');

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

userSchema.methods.getUserFullName = function () {
  return `${this.name}`;
};

userSchema.methods.isInformation = function () {
    return `${this.status}`;
};

module.exports =  mongoose.model('User', userSchema);