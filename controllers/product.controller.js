var Product = require('../model/product.model');

module.exports.index = async function(req, res){
    var products = await Product.find();
    // var products = await Product.distinct('image');
    var x = req.query.page || 1;
    var n = 24;
    var start = (x - 1) * n;
    var end = x * n;
    var totalPage = products.length / n;
    var temp = 0;
    var arr = [];
    for (var i = 0; i < totalPage; i++) {
        arr.push(++temp);
    }
    res.render('index', {
        products: products.slice(start, end),
        pages: arr,
        active: parseInt(x),
        max: temp
    });
}