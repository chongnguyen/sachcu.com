var Product = require('../model/product.model');

module.exports.index = async function(req, res){
    var products = await Product.find().sort({date: -1});
    var genres = await Product.distinct('kind');
    
    // Phan trang
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
        kinds: genres,
        pages: arr,
        active: parseInt(x),
        max: temp
    });
}

module.exports.sort = async function(req, res){
    var order = req.params.order;
    if(order === 'name'){
        var products = await Product.find().sort({name: 1});
    } else if(order === 'price'){
        var products = await Product.find().sort({price: 1});
    } else {
        var products = await Product.find().sort({price: -1});
    }
    
    var genres = await Product.distinct('kind');
    
    // Phan trang
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
        kinds: genres,
        pages: arr,
        active: parseInt(x),
        max: temp
    });
}