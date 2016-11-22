


var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function (express,app,io) {

    //set template engine
    app.set('view engine','jade');
    app.set('views',['./app/views','./public']);

    app.use(function (req,res,next) {
      req.io = io;
      next();
    });

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(session({
      secret: 'secret_key',
      resave: false,
      saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());
     //require route
    require('../app/routes/index.route.js')(app);
    require('../app/routes/jadeView.route.js')(app);
    require('../app/routes/product.route.js')(app);
    require('../app/routes/following.route.js')(app);
    require('../app/routes/user.route.js')(app);
    require('../app/routes/comment.route.js')(app);
    //set static flies
    app.use(express.static('./public'));

}
