let middleware = {

    loginRequired: function(req, res, next) {
        if(req.user) {
            next();
        } else {
            console.log("Not logged in. Cannot view this page.");
            res.redirect('login');
        }
    }
};

module.exports = middleware;