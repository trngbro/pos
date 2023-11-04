const {Users} = require("../models/user");
const Token = require("../models/token");
const crypto = require("../helpers/crypto");
const sendEmail = require("../helpers/sendEmail");
const crypto_fromLib = require('crypto');
const styles = require('../helpers/stylesheetsConfig');
const scripts = require('../helpers/javascriptConfig');

const staffControllers = {
    viewAllStaffByList: async (req, res) => {
        try {
            let users = await Users.find({}).exec();
            let arr = [];

            users.forEach(element => {
                arr.push({
                    mail: element.mail,
                    user: element.user,
                    name: element.name,
                    dateCreated: element.dateCreated,
                    status: element.status,
                    type: element.type
                })
            });

            res.render("staffTable", {
                pathIsLevelTwo: false,
                stylesheets: styles.tableCSS,
                javascripts: scripts.tableJS,
                staffData: arr
            })
        } catch (error) {
            res.render("error", {error: error})
        }
    },
    createANewStaff: (req, res) => {
        try {
            res.render("staffForm", {
                pathIsLevelTwo: true,
                stylesheets: styles.formCSS,
                javascripts: scripts.formJS
            })
        } catch (error) {
            res.render("error")
        }
    },
    createANewManager: (req, res) => {
        try {
            res.render("staffForm", {
                pathIsLevelTwo: true,
                stylesheets: styles.formCSS,
                javascripts: scripts.formJS
            })
        } catch (error) {
            res.render("error")
        }
    },
    toggleStatus: async (req, res) => {
        try {
            console.log(req.body.mail)
            if(req.body.mail){
                const user = await Users.findOne({mail:req.body.mail});
                console.log(user.status === "active")
                if(user.status === "active"){
                    await Users.findOneAndUpdate({mail:req.body.mail}, {status:"block"});
                    console.log("done")
                }
                if(user.status === "block"){
                    await Users.findOneAndUpdate({mail:req.body.mail}, {status: "active"});
                }
                res.status(200).send("Successed");
            }
            else{
                res.status(400).send("Fail");
            }
        } catch (error) {
            res.status(500).send("error");
        }
    },
    resendVerify: async (req, res) => {
        try {
            if(req.body.mail){
                const user = await Users.findOne({mail:req.body.mail});
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

                res.status(200).send("Successed");
            }
            else{
                res.status(400).send("Fail");
            }
        } catch (error) {
            res.status(500).send("error");
        }
    }
}

module.exports = staffControllers