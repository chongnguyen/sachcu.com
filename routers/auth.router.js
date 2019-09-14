var express = require('express')

var controller = require('../controllers/auth.controller');
var validate = require('../validate/form.validate');


var router = express.Router();

// GET
router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/clearCookie', controller.clearCookie);

// POST
router.post('/login', validate.loginValidate, controller.postLogin);

router.post('/register', validate.registerValidate, controller.postRegister);

module.exports = router;