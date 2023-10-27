const User = require("../models/user")
const crypto = require("../helpers/crypto")

const loginController = {
    rederLoginPage: (req, res) => {
        try {
            if(req.cookies.userLog){
                res.redirect('home')
            }
            else{
                res.render('login', {layout: false})
            }
        } catch (error) {
            res.redirect('logout');
        }
    },
    loginChecking: async (req, res) => {
        try {
            const user = await User.find({user: req.body.username, password: crypto.password_hash(req.body.password)}).exec();
            if(user[0]._id){
                res.cookie('userLog', crypto.encode(user[0].id, user[0].name, user[0].type, user[0].status));
                res.redirect('home');
            }
            else{
                res.render('login', {
                    layout: true,
                    status: "Email or password is not corrected"
                })
            }
        } catch (error) {
            res.redirect('login?login=password-or-username-be-not-correct')
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