module.exports.loginMiddleware = function(req, res, next){
    var user = req.cookies.userId;
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    res.locals.userId = user;
    next();
}