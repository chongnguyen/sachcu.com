
var User = require('../model/user.model');

module.exports.loginValidate = async function(req, res, next){
    var errors = [];

    var user = await User.findOne({email: req.body.email});

    if(!user){
        errors.push("Email chưa đăng ký!");
        res.render('auth/login', {
            errors: errors,
            value: req.body
        })
        return;
    }

    if(user.pass !== req.body.pass){
        errors.push("Sai mật khẩu. Vui lòng nhập lại !");
        res.render('auth/login', {
            errors: errors,
            value: req.body
        })
        return;
    }
    res.cookie('userId', user.id);
    next();
}


module.exports.registerValidate = async function(req, res, next){
    var errors = [];

    var user = await User.findOne({email: req.body.email});

    if(!req.body.name || !req.body.email || !req.body.pass || !req.body.confirm){
        errors.push("Không được để trống");
        res.render('auth/register', {
            errors: errors,
            value: req.body
        })
        return;
    }

    if(user){
        errors.push("Email đã được đăng ký!");
        res.render('auth/register', {
            errors: errors,
            value: req.body
        })
        return;
    }

    if(req.body.confirm !== req.body.pass){
        errors.push("Mật khẩu không khớp");
        res.render('auth/register', {
            errors: errors,
            value: req.body
        })
        return;
    }
    next();
}

module.exports.createProduct = function(req, res, next){
    if(!req.body.name || !req.body.author || !req.body.price){
        res.render('users/create', {
            error: "Không được bỏ trống",
            value: req.body
        })
        return;
    }
    
    next();
}