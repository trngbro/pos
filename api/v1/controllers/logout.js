const logoutController = {
    renderLogoutPage: (req, res) => {
        res.clearCookie('userLog');
        res.redirect('login');
    }
}

module.exports = logoutController