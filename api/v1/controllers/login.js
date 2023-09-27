const {User} = require("../models/models")
const encode = require("../middlewares/crypto")
const localStorage = require('localStorage');

const loginController = {
    rederLoginPage: (req, res) => {
        try {
            if(localStorage.getItem("user"))
                res.redirect("./home");
            else
                res.render('login');
        } catch (error) {
            res.render('error');
        }
    },
    loginChecking: async (req, res) => {
        try {
            const user = await User.find({user: req.body.username, password: encode(req.body.password)}).exec();
            if(user[0]._id){
                var arr = new Array();
                if (typeof localStorage === "undefined" || localStorage === null) {
                    var LocalStorage = require('node-localstorage').LocalStorage;
                    localStorage = new LocalStorage('./scratch');
                }
                var lc_user = localStorage.getItem("user");
                if(lc_user != null)
                    arr = [];
                arr.push({
                    userId: user[0]._id,
                    type: user[0].type,
                    status: user[0].status
                })
                localStorage.setItem("user", JSON.stringify(arr));
                if(user[0].type == "block") {
                    arr = [];
                    res.render('login')
                }
                else{
                    res.redirect('./home')
                }
            }
            else return res.status(401).json({message: "Login fail"})
        } catch (error) {
            res.status(500).json(error)
        }
    },
    identifyUser: (req, res) => {
        try {
            // Send mail a reset password
        } catch (error) {
            res.render('error');
        }
    },
    resetAccount: (req, res) => {
        try {
            
        } catch (error) {
            res.render('error');
        }
    }
}

module.exports = loginController;