"use strict"
var express = require('express');
var scss = require('node-sass-middleware');
var bodyParser = require('body-parser');


module.exports = function () {
    var app = express();
    //set template engine
    app.set('view engine','jade');
    app.set('views',['./app/views','./public']);

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(scss({
        src: './scss',
        dest: './public/css',
        outputStyle: 'compressed',
        prefix: '/css',
        debug: true
    }));
     //require route
    require('../app/routes/index.route.js')(app);
    require('../app/routes/jadeView.route.js')(app);
    require('../app/routes/product.route.js')(app);

    //set static flies
    app.use(express.static('./public'));
    return app;
}
