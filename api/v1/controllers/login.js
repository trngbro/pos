const {Users, validate} = require("../models/user");
const Token = require("../models/token")
const crypto = require("../helpers/crypto")
const sendEmail = require("../helpers/sendEmail")
const crypto_fromLib = require('crypto');

const loginController = {
    rederLoginPage: (req, res) => {
        try {
            console.log(req.url)
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
    renderPage: (req, res) => {
        try {
            res.redirect('../logout');
        } catch (error) {
            res.redirect('../logout');
        }
    },
    loginChecking: async (req, res) => {
        try {
            const user = await Users.find({user: req.body.username, password: crypto.password_hash(req.body.password)}).exec();
            if(user[0]._id){
                console.log(user[0].id, user[0].name, user[0].type, user[0].status)
                res.cookie('userLog', crypto.encode(user[0].id, user[0].name, user[0].type, user[0].status));
                res.cookie('userName', user[0].name).cookie('userImageUser', user[0].image);
                res.redirect('home');
            }
            else {
                res.render('login', {
                    layout: true,
                    status: "Email or password is not corrected"
                })
            }
        } catch (error) {
            console.log(error)
            res.redirect('login?login=password-or-username-be-not-correct')
        }
    },
    identifyUser: async (req, res) => {
        try {
            const { error } = validate(req.body);
            if (error) return res.status(422).send(JSON.stringify(error.details[0].message));
            let user = await Users.findOne({ mail: req.body.mail });
            if (user)
                return res.status(409).send("User with given email already exist!");
            const detectUsername = function(email){
                return email.split('@')[0]
            }
            user = await new Users({
                name: req.body.name,
                mail: req.body.mail,
                type: req.body.type,
                password: crypto.password_hash(detectUsername(req.body.mail)),
                user: detectUsername(req.body.mail),
            }).save();

            let token = await new Token({
                userId: user._id,
                token: crypto_fromLib.randomBytes(32).toString("hex"),
            }).save();

            const test = `
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #F5F5F5;
                            margin: 0;
                            padding: 0;
                        }
                
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #F5F5F5;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            border-radius: 5px;
                        }
                
                        .header {
                            background-color: #F99417;
                            color: #fff;
                            padding: 20px;
                            text-align: center;
                        }
                
                        .content {
                            padding: 20px;
                        }
                
                        .button {
                            background-color: #4D4C7D;
                            color: #fff;
                            padding: 10px 20px;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                
                        .button:hover {
                            background-color: #363062;
                        }
                
                        .note {
                            font-size: 12px;
                            color: #777;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Welcome to Cellphonez</h2>
                        </div>
                        <div class="content">
                            <p>Hello `+ user.name +`,</p>
                            <p>We're excited to have you as part of our community. But before we get started, we need to confirm your email address to ensure the security of your account.</p>
                            <p><b>Please verify your email within the next 1 minute.</b></p>
                            <p><i>To verify your email, simply click the button below:<i></p>
                            <a class="button" href="` + `${process.env.BASE_URL}/login/identify/${user.id}/${token.token}` +`">Verify My Email</a>
                            
                            <p><span class="note">Note: This link is only valid for 1 minute.</span></p>
                            <p>Once you've verified your email, you'll have a part access to all the exciting features and content on CellphoneZ.</p>
                            <p>If you did not sign up for CellphoneZ, please disregard this email.</p>
                            <p>We're here to help! If you have any questions or need assistance, please don't hesitate to contact our support team at <a href="mailto:52000693@student.tdtu.edu.vn">52000693@student.tdtu.edu.vn</a>.</p>
                            <p>Welcome to CellphoneZ's family</p>
                            <p><span class="note">Best regards, ICT Dept<br>[Trung-Nghia Nguyen]<br>CellphoneZ</span></p>
                        </div>
                    </div>
                </body>
                </html>
            `

            await sendEmail(user.mail, "Verify Email", test);

            res.status(200).send("An Email sent to your account please verify");
        } catch (error) {
            res.status(400).json("An error occurred while sending mail");
        }
    },
    verifyAccount: async (req, res, next) => {
        try {
            const user = await Users.findOne({ _id: req.params.id });
            if (!user) return res.render("blocking", {layout: false});
        
            const token = await Token.findOne({
              userId: user._id,
              token: req.params.token,
            });
            if (!token) return res.render("blocking", {layout: false});

        
            await Users.findByIdAndUpdate(user._id, { status: "notchange" });

            await Token.findByIdAndRemove(token._id);
        
            req.body = {
                userIdMustChangePassword: user._id,
                user: user.user,
            };

            next();
        } catch (error) {
            res.status(400).send(error);
        }
    },
    resetAccount: async (req, res) => {
        try {
            console.log(req.body)
            await Users.findByIdAndUpdate(req.body.userId, { password: crypto.password_hash(req.body.password), status: "active" });
            console.log("Pass")
            res.status(200).send("successed change")
        } catch (error) {
            res.status(400).send("some errors went changing password");
        }
    },
    firstChangePassword: async (req, res) => {
        try {
            if(!req.body.userIdMustChangePassword)  return res.status(303).json("êrror")
            res.render("resetPassword", {layout: false, user: req.body.user, userId: req.body.userIdMustChangePassword})
        } catch (error) {
            
        }
    },
    changePasswordIfForgot: async (req, res) => {
        try {
            let user = await Users.findOne({ mail: req.body.mail });
            let token = await new Token({
                userId: user._id,
                token: crypto_fromLib.randomBytes(32).toString("hex"),

            }).save();

            const test = `
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #F5F5F5;
                            margin: 0;
                            padding: 0;
                        }
                
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #F5F5F5;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            border-radius: 5px;
                        }
                
                        .header {
                            background-color: #F99417;
                            color: #fff;
                            padding: 20px;
                            text-align: center;
                        }
                
                        .content {
                            padding: 20px;
                        }
                
                        .button {
                            background-color: #4D4C7D;
                            color: #fff;
                            padding: 10px 20px;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                
                        .button:hover {
                            background-color: #363062;
                        }
                
                        .note {
                            font-size: 12px;
                            color: #777;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Welcome to Cellphonez</h2>
                        </div>
                        <div class="content">
                            <p>Hello `+ user.name +`,</p>
                            <p>We received a request to reset your password. To reset your password.</p>
                            <p><b>Please verify your email within the next 1 minute.</b></p>
                            <p><i>To verify your email, simply click the button below:<i></p>
                            <a class="button" href="` + `${process.env.BASE_URL}/login/resetPassword/${user.id}/${token.token}` +`">Reset Password</a>
                            
                            <p><span class="note">Note: This link is only valid for 1 minute.</span></p>
                            <p>Once you've verified your email, you'll have a part access to all the exciting features and content on CellphoneZ.</p>
                            <p>If you did not sign up for CellphoneZ, please disregard this email.</p>
                            <p>We're here to help! If you have any questions or need assistance, please don't hesitate to contact our support team at <a href="mailto:52000693@student.tdtu.edu.vn">52000693@student.tdtu.edu.vn</a>.</p>
                            <p>Welcome back to CellphoneZ's family</p>
                            <p><span class="note">Best regards, ICT Dept<br>[Trung-Nghia Nguyen]<br>CellphoneZ</span></p>
                        </div>
                    </div>
                </body>
                </html>
            `

            await sendEmail(user.mail, "Reset password", test);

        } catch (error) {
            throw error;
        } finally {
            res.status(200).send("If email exists, we sended mail to changing password for now")
        }
    },
    changePassword: async (req, res) => {
        try {
            if(!req.body.userIdMustChangePassword)  return res.status(303).json("êrror")
            res.render("resetPassword", {layout: false, user: req.body.user, userId: req.body.userIdMustChangePassword})
        } catch (error) {
            
        }
    }
}

module.exports = loginController;