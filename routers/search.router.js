var express = require('express');

var controller = require('../controllers/search.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/kind', controller.kind);

module.exports  = router;