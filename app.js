var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/book-store', {useNewUrlParser: true});

// CONTROLLER
var controller = require('./controllers/product.controller');

// ROUTER
var userRouter  = require('./routers/user.router');
var authRouter = require('./routers/auth.router');
var searchRouter = require('./routers/search.router');

// MIDDLEWARE
var middleware = require('./middleware/login.middleware');

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

//set folder public
app.use(express.static('public'));

// set template engine PUG 
app.set('view engine', 'pug');
app.set('views', './views');

// GET TRANG CHU
app.get('/', controller.index);

app.use('/auth', authRouter);
app.use('/users', middleware.loginMiddleware, userRouter);
app.use('/search', searchRouter);

app.listen(port, function(){
    console.log('listen to port: ' + port)
})


// ======================================================================================= /////////
// TODO load data genres and save image to file into database and display