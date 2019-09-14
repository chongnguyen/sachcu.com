var Product = require('../model/product.model');

module.exports.index = async function(req, res){
    var q = req.query.q;

    var products = await Product.find();

    var matchedProducts = products.filter(function(item){
        return item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })

    res.render('index', {
        products: matchedProducts,
        pages: [],
        kinds: []
    })
}

module.exports.kind = async function(req, res){
    var category = req.query.category;
    var genres = await Product.distinct('kind');

    var products = await Product.find({kind: category});

    res.render('index', {
        products: products,
        pages: [],
        kinds: [],
        kinds: genres
    })
}