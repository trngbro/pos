const Joi = require('joi');
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
        default: "noaccess",
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

const Users =  mongoose.model('User', userSchema);

const sampleUsers = [
    {
        mail: "87295854+trngbro@users.noreply.github.com",
        user: "admin",
        password: "513da788167a5218-14b5cfd8430025b2",
        name: "Trung-Nghia Nguyen",
        status: "active",
        type: "admin"
    }
]

Users.insertMany(sampleUsers)
    .then(() => {
        console.log("Users data are inserted.");
    })
    .catch((error) => {
        console.log("Has error/ or data was had before at Users model");
    });

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        mail: Joi.string().email().required(),
        type: Joi.string().valid('staff', 'admin').required()
    });
    return schema.validate(user);
};

module.exports = {Users, validate};