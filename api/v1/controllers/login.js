const {Users, validate} = require("../models/user");
const Token = require("../models/token")
const crypto = require("../helpers/crypto")
const sendEmail = require("../helpers/sendEmail")
const crypto_fromLib = require('crypto');

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
            const user = await Users.find({user: req.body.username, password: crypto.password_hash(req.body.password)}).exec();
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
    identifyUser: async (req, res) => {
        try {
            
            const { error } = validate(req.body);
            if (error) return res.status(400).send(error.details[0].message);
            let user = await Users.findOne({ mail: req.body.mail });
            if (user)
                return res.status(400).send("User with given email already exist!");
            console.log(req.body)
            const detectUsername = function(email){
                return email.split('@')[0]
            }
            console.log(detectUsername(req.body.mail))
            user = await new Users({
                name: req.body.name,
                mail: req.body.mail,
                type: req.body.type,
                password: crypto.password_hash(req.body.password),
                user: detectUsername(req.body.mail),
            }).save();
            console.log(user)
            console.log(crypto_fromLib.randomBytes(32).toString("hex"))


            let token = await new Token({
                userId: user._id,
                token: crypto_fromLib.randomBytes(32).toString("hex"),
            }).save();
            console.log("Pass")


            const message = `${process.env.BASE_URL}/user/verify/${user.id}/${token.token}`;
            await sendEmail(user.mail, "Verify Email", message);

            res.send("An Email sent to your account please verify");
        } catch (error) {
            res.status(400).json("Error");
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