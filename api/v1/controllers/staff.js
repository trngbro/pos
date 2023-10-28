const {Users} = require("../models/user")
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
}

module.exports = staffControllers