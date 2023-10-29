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
            
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log(user);

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
            if (!user) return res.status(400).send("Invalid link");
        
            const token = await Token.findOne({
              userId: user._id,
              token: req.params.token,
            });
            if (!token) return res.status(400).send("Invalid link");

        
            await Users.findByIdAndUpdate(user._id, { status: "block" });

            await Token.findByIdAndRemove(token._id);
        
            req.body = {
                userIdMustChangePassword: user._id,
            };

            next();
        } catch (error) {
            res.status(400).send(error);
        }
    },
    resetAccount: (req, res) => {
        try {
            
        } catch (error) {
            res.redirect('error');
        }
    },
    firstChangePassword: async (req, res) => {
        try {
            if(!req.body.userIdMustChangePassword)  return res.status(303).send("must ")
        } catch (error) {
            
        }
    }
}

module.exports = loginController;