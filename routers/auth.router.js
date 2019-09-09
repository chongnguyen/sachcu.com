var express = require('express')

var controller = require('../controllers/auth.controller');

var router = express.Router();

// GET
router.get('/login', controller.login);
router.get('/register', controller.register);

// POST
router.post('/login', controller.postLogin);

module.exports = router;