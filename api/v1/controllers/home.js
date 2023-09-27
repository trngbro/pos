const localStorage = require('localStorage');

const homeController = {
    rederHomepage: (req, res) => {
        var arr = new Array();
        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
        }
        var lc_user = localStorage.getItem("user");
        if (lc_user !== null) {
            lc_user = JSON.parse(lc_user.slice(1, -1));
        }
        console.log(typeof lc_user)
        console.log(lc_user)
        if(lc_user == null) res.redirect("/login");
        else{
            try {
                
                if(lc_user.status == "block"){
                    res.render("layouts/layout");

                }
                else {
                    res.render("index")
                }
                
            } catch (error) {
                res.render("error", {message: "Loi"})
            }
        }
    },
}

module.exports = homeController