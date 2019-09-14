var User = require('../model/user.model');

// GET CONTROLLER
module.exports.login = function(req, res){
    res.render('auth/login');
}

module.exports.register = function(req, res){
    res.render('auth/register');
}

module.exports.clearCookie = function(req, res){
    res.clearCookie('userId');
    res.redirect('/auth/login');
}

// POST CONTROLLER
module.exports.postLogin = async function(req, res){
    // var email = req.body.email;
    // var pass = req.body.pass;
    // if(email !== 'trong@gmail.com' || pass !== '12345'){
    //     res.render('auth/login');
    //     return;
    // }

    // var user = await User.findOne({email: req.body.email});

    // if(!user){
    //     res.render('auth/login', {
    //         error: "Email not exist"
    //     })
    //     return;
    // }

    // if(user.pass !== req.body.pass){
    //     res.render('auth/login', {
    //         error: "Wrong Password"
    //     })
    //     return;
    // }

    res.redirect('/users');
}

module.exports.postRegister = async function(req, res) {
    var user = new User(req.body);
    user.save();

    res.redirect('/users')
}