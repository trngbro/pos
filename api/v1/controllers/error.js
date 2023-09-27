const renderErrorPage = {
    page403: (req, res) => {
        try {
            res.render('403')
        } catch (error) {
            res.render('error')
        }
    },
    page404: (req, res) => {
        try {
            res.render('404')
        } catch (error) {
            res.render('error')
        }
    },
    page500: (req, res) => {
        try {
            res.render('500')
        } catch (error) {
            res.render('error')
        }
    },
}

module.exports = renderErrorPage;