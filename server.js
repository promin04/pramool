"use strict"
//database
require('./config/mongoose.js');
require('./config/passport.js')();
//server
var app = require('./config/express.js')();

app.listen(3000,console.log('app listenning on port: 3000'));
