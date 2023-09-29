const renderErrorPage = {
    page403: (req, res) => {
        try {
            res.render('403', {
                layout: false,
                pathIsLevelTwo: false
            })
        } catch (error) {
            res.redirect('error')
        }
    },
    page404: (req, res) => {
        try {
            res.render('404', {
                layout: false,
                pathIsLevelTwo: false
            })
        } catch (error) {
            res.redirect('error')
        }
    },
    page500: (req, res) => {
        try {
            res.render('500', {
                layout: false,
                pathIsLevelTwo: false
            })
        } catch (error) {
            res.redirect('error')
        }
    },
}

module.exports = renderErrorPage;