const crypto = require("../helpers/crypto")
const {Users, validate} = require("../models/user");
const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')


const userControllers = {
    getUserInfo: async (req, res) => {
        try {
            const thisUser = await Users.findById(crypto.decode(req.cookies.userLog).uid)
            res.render("userInfoPage", {
                pathIsLevelTwo: false,
                isOff: true,
                stylesheets: styles.homeCSS,
                javascripts: scripts.homeJS,
                userId: thisUser._id,
                userEmail: thisUser.mail,
                userName: thisUser.user,
                userFullName: thisUser.name,
                userImage: thisUser.image
            })  
        } catch (error) {
            res.render("userInfoPage", {
                pathIsLevelTwo: true,
                stylesheets: styles.homeCSS,
                javascripts: scripts.homeJS,
                userId: "empty",
                userEmail: "empty",
                userName: "empty",
                userFullName: "empty",
                userImage: "empty"
            })  
        }
    },

    changePassword: async (req, res) => {
        try {
            const { oldPassword, newPassword, confirmPassword, uid } = req.body;
    
            if (newPassword === confirmPassword) {
                // Kiểm tra xem người dùng có tồn tại và mật khẩu cũ đúng không
                const user = await Users.findOne({ _id: uid, password: crypto.password_hash(oldPassword) }).exec();
                if (user) {
                    // Cập nhật mật khẩu mới
                    const thisu = await Users.findOneAndUpdate({ _id: user._id }, { password: crypto.password_hash(newPassword) });
                    
                    res.status(200).send("Successed");
                } else {
                    res.status(401).send("Wrong old password");
                }
            } else {
                res.status(403).send("Mistake");
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: "Lỗi khi đổi mật khẩu." });
        }
    },

    changeImage: async (req, res) => {
        try {
            const { uid, image } = req.body;
    
            if (uid) {
                const u = await Users.findOneAndUpdate({ _id: uid }, { image: image });
                console.log(u.image)
                res.status(200).send("Successed");
                
            } else {
                res.status(403).send("Fail");
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: "Lỗi khi cập nhật hình ảnh" });
        }
    }
    
}

module.exports = userControllers