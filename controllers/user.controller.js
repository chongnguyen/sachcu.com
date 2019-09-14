var Product = require('../model/product.model');

module.exports.index = async function(req, res){
    var products = await Product.find({userId: req.cookies.userId});
    // console.log(userId);
    res.render('users/index', {
        products: products
    });
}

module.exports.create = function(req, res){
    res.render('users/create');
}

module.exports.view = async function(req, res){
    console.log(req.params);
    var product = await Product.findOne({_id: req.params.id});

    res.render('users/edit', {
        product: product
    })
}

module.exports.delete = async function(req, res){
    var x = await Product.findOneAndDelete({ _id: req.params.id });
    res.redirect('/users');
}

module.exports.update = async function(req, res){
    req.body.image = req.file.path.slice(6);
    req.body.userId = req.cookies.userId;
    var x = await Product.updateOne({_id: req.params.id}, req.body);
    res.redirect('/users');
}

module.exports.postCreate = function(req, res){

    // console.log(req.body);
    // console.log(req.file.path.slice(6));
    // var image = req.file.path.slice(6);
    // req.body.image = image;

    // res.redirect('/users');
    if(req.file){
        req.body.image = req.file.path.slice(6);
    } else {
        req.body.image = '\\img\\taylor.jpg'
    }
    req.body.userId = req.cookies.userId;
    var product = new Product(req.body);
    product.save();

    res.redirect('/users');
}
