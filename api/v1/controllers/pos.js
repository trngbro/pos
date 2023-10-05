
const styles = require('../helpers/stylesheetsConfig')
const scripts = require('../helpers/javascriptConfig')

const posControllers = {
    renderPOSPage: (req, res) => {
        try {
            res.render('main_pos', {
                pathIsLevelTwo: false,
                stylesheets: styles.point_of_sale,
                javascripts: scripts.point_of_sale,
                layout: false
            })
        } catch (error) {
            res.render('error')
        }   
    }
}

module.exports = posControllers