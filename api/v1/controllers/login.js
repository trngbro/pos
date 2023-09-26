const {User} = require("../models/models")
const encode = require("../middlewares/crypto")
const localStorage = require('localStorage');

const loginController = {
    rederLoginPage: (req, res) => {
        try {
            res.render('index', {title: "Login page"});
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
                localStorage.setItem('myFirstKey', 'myFirstValue');
                console.log();
                var lc_user = localStorage.getItem("user");
                if(lc_user != null)
                    arr = [];
                arr.push({
                    userId: user[0]._id,
                    tyoe: user[0].type,
                    status: user[0].status
                })
                localStorage.setItem("user", JSON.stringify(arr));
                
                return res.status(200).json({message: "Login success", message: localStorage.getItem('user')})
            }
            return res.status(401).json({message: "Login fail"})
        } catch (error) {
            res.status(500).json(error)
        }
    },
}

module.exports = loginController;