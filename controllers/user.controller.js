var Product = require('../model/product.model');
var Bill = require('../model/bill.model');

module.exports.index = async function(req, res){
    var products = await Product.find({userId: req.cookies.userId}).sort({date: -1});
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
    if(req.file){
        req.body.image = req.file.path.slice(6);
    } else {
        req.body.image = '\\img\\taylor.jpg'
    }
    var x = await Product.updateOne({_id: req.params.id}, req.body);
    res.redirect('/users');
}

module.exports.bills = async function(req, res){
    var products = [];
    var bills = await Bill.find({$and: [{users: req.cookies.userId}, {state: false}]}).sort({date: -1});

    for(var i = 0; i < bills.length; i++){
        var productId = bills[i].products;
        var product = await Product.findOne({_id: productId});
        products.push(product);
    }
    // bills.forEach(async function(item){
    //     // listProducts.push(item.products);
    //     var productId = item.products;
    //     var product = await Product.findOne({_id: productId});
    //     products.push(product);
    // })
    // var products = await Product.find({_id: {$in: listProducts}})

    res.render('users/bill', {
        bills: bills,
        products: products
    })
}

module.exports.process = async function(req, res){
    var bill = req.params.billId;
    console.log(bill);
    var x = await Bill.updateOne({_id: req.params.billId}, {$set: {state: true}});
    console.log(x);
    res.redirect('/users/bills');
}

module.exports.done = async function(req, res){
    var products = [];
    var bills = await Bill.find({$and: [{users: req.cookies.userId}, {state: true}]}).sort({date: -1});

    for(var i = 0; i < bills.length; i++){
        var productId = bills[i].products;
        var product = await Product.findOne({_id: productId});
        products.push(product);
    }

    res.render('users/bill', {
        bills: bills,
        products: products,
        done: true
    })
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
        req.body.image = '\\img\\book-1.jpg'
    }
    req.body.name = req.body.name.toLowerCase();
    req.body.userId = req.cookies.userId;
    req.body.date =  Date.now() / 1000000000;
    var product = new Product(req.body);
    product.save();

    res.redirect('/users');
}
