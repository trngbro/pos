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
                pathIsLevelTwo: false,
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
                const user = await Users.find({ id: uid, password: crypto.password_hash(oldPassword) });
    
                if (user) {
                    // Cập nhật mật khẩu mới
                    const thisu = await Users.findOneAndUpdate({ _id: uid }, { password: crypto.password_hash(newPassword) });
                    console.log(thisu)
                    res.status(200).json({ status: 200, message: "Sửa mật khẩu thành công." });
                } else {
                    res.status(401).json({ status: 401, message: "Mật khẩu cũ không chính xác." });
                }
            } else {
                res.status(403).json({ status: 403, message: "Mật khẩu mới và xác nhận mật khẩu không khớp." });
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: "Lỗi khi đổi mật khẩu." });
        }
    }
    
}

module.exports = userControllers