const localStorage = require('localStorage');

const {User} = require("../models/_models")
const localStorageSupport = require('../helpers/localStorageSupport');

const loginController = {
    rederLoginPage: (req, res) => {
        try {
            if(localStorageSupport.checkItemExist("user"))
                res.redirect("./home");
            else
                res.render('login', {
                    layout: false,
                    pathIsLevelTwo: false
                });
        } catch (error) {
            res.redirect('error');
        }
    },
    loginChecking: async (req, res) => {
        try {
            const user = await User.find({user: req.body.username, password: req.body.password}).exec();
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
                res.redirect('./home')
            }
            else return res.status(401).json({message: "Login fail"})
        } catch (error) {
            res.status(333).json(res.body)
        }
    },
    identifyUser: (req, res) => {
        try {
            // Send mail a reset password
        } catch (error) {
            res.redirect('error');
        }
    },
    resetAccount: (req, res) => {
        try {
            
        } catch (error) {
            res.redirect('error');
        }
    }
}

module.exports = loginController;