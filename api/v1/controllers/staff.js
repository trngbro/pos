const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

const staffControllers = {
    viewAllStaffByList: (req, res) => {
        try {
            res.render("staffTable", {
                pathIsLevelTwo: false,
                stylesheets: styles.tableCSS,
                javascripts: scripts.tableJS
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