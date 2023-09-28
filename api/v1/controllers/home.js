const localStorageSupport = require('../middlewares/localStorageSupport');

const homeController = {
    rederHomepage: (req, res) => {
        const lc_user = localStorageSupport.checkItemExist("user", true);
        if(lc_user == null) res.redirect("/login");
        else{
            try {
                if(lc_user.status == "block"){
                    res.render("noauth");
                }
                else {
                    // or staff, admin
                    res.render("index")
                }
                
            } catch (error) {
                res.render("error", {message: "Loi"})
            }
        }
    },
    rederCustomerManagePage: (req, res) => {
        try {
            res.render('customer')
        } catch (error) {
            res.render('error')
        }   
    }
}

module.exports = homeController