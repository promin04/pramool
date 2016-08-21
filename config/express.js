"use strict"
var express = require('express');

module.exports = function () {
var app = express();
//set template engine
app.set('view engine','jade');
app.set('views','./app/views');
 //require route
require('../app/routes/index.route.js')(app);
//set static flies
app.use(express.static('public'));
return app;
}
