var Product = require('../model/product.model');

module.exports.index = async function(req, res){
    var q = req.query.q;

    var products = await Product.find();

    var matchedProducts = products.filter(function(item){
        return item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })

    var x = req.query.page || 1;
    var n = 24;
    var start = (x - 1) * n;
    var end = x * n;
    var totalPage = matchedProducts.length / n;
    var temp = 0;
    var arr = [];
    for (var i = 0; i < totalPage; i++) {
        arr.push(++temp);
    }

    res.render('index', {
        products: matchedProducts.slice(start, end),
        pages: arr
    })
}