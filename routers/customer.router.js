var express = require('express');

var controller = require('../controllers/customer.controller');
var validate = require('../validate/form.validate')

var router = express.Router();

router.get('/pay/:id/:userId', controller.index);

router.post('/pay/:id/:userId',validate.pay, controller.pay);
module.exports = router;