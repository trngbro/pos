const localStorageSupport = require('../helpers/localStorageSupport');
const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

const homeController = {
    rederHomepage: (req, res) => {
        const lc_user = localStorageSupport.checkItemExist("user", true);
        if(lc_user == null) res.redirect("/login");
        else{
            try {
                if(lc_user.status == "block"){
                    res.render("noauth", {
                        pathIsLevelTwo: false,
                        stylesheets: styles.homeCSS,
                        javascripts: scripts.homeJS
                    });
                }
                else {
                    // or staff, admin
                    res.render("home", {
                        pathIsLevelTwo: false,
                        stylesheets: styles.homeCSS,
                        javascripts: scripts.homeJS
                    })
                }
                
            } catch (error) {
                res.redirect("error")
            }
        }
    },
    rederCustomerManagePage: (req, res) => {
        try {
            res.render('customer', {
                pathIsLevelTwo: false,
                stylesheets: styles.homeCSS,
                javascripts: scripts.homeJS
            })
        } catch (error) {
            res.redirect('error')
        }   
    }
}

module.exports = homeController