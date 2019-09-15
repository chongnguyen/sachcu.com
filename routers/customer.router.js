var express = require('express');

var controller = require('../controllers/customer.controller');

var router = express.Router();

router.get('/pay/:id/:userId', controller.index);

router.post('/pay/:id/:userId', controller.pay);
module.exports = router;