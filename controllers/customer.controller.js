var Bill = require('../model/bill.model');
var Product = require('../model/product.model');

module.exports.index = function(req, res){
    res.render('customer/pay');
}

module.exports.pay = async function(req, res){
    var productId = req.params.id;
    var userId = req.params.userId;

    var product = await Product.findById(productId)
    req.body.price = product.price;

    req.body.products = productId;
    req.body.users = userId;

    req.body.address = req.body.duong +", "+req.body.phuongxa +", "+ req.body.quanhuyen +", "+ req.body.tinh;
    console.log(req.body);

    var bill = new Bill(req.body);
    bill.save();
    res.redirect('/');
}