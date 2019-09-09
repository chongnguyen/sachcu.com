// GET CONTROLLER
module.exports.login = function(req, res){
    res.render('auth/login');
}

module.exports.register = function(req, res){
    res.render('auth/register');
}

// POST CONTROLLER
module.exports.postLogin = function(req, res){
    var email = req.body.email;
    var pass = req.body.pass;
    if(email !== 'trong@gmail.com' || pass !== '12345'){
        res.render('auth/login');
        return;
    }
    res.cookie('userId', '1434253rrfsd');
    res.redirect('/users');
}