const logoutController = {
    renderLogoutPage: (req, res) => {
        res.clearCookie('userLog');
        res.clearCookie('userName');
        res.clearCookie('userImge');
        res.redirect('login');
    }
}

module.exports = logoutController