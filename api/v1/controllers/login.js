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
            res.redirect('error');
        }
    },
    loginChecking: async (req, res) => {
        try {
            const user = await User.find({user: req.body.username, password: req.body.password}).exec();
            if(user[0]._id){
                res.cookie('userLog', crypto.encode(user[0].id, user[0].type, user[0].status))
                res.redirect('home')
            }
            else{
                res.redirect('login')
            }
        } catch (error) {
            res.redirect('login')
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