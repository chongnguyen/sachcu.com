var mongoose = require('mongoose');

var billSchema = new mongoose.Schema({
    name: String,
    phone: String,
    note: String,
    price: Number,
    products: String,
    users: String,
    address: String
});

var Bill = mongoose.model('Bill', billSchema, 'bills');

module.exports = Bill;