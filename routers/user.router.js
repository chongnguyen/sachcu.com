var express = require('express');
var multer  = require('multer')

var controller = require('../controllers/user.controller');
var createValidate = require('../validate/form.validate');

var router = express.Router();
var upload = multer({ dest: 'public/uploads/' })

//GET
router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/view/:id', controller.view);
router.get('/delete/:id', controller.delete);


// POST
router.post('/create', upload.single('avatar'), createValidate.createProduct, controller.postCreate);
router.post('/update/:id', upload.single('avatar'), controller.update);

module.exports = router;