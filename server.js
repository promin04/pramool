"use strict"
var express = require('express');
var app = express();

//database
require('./config/mongoose.js');
require('./config/passport.js')();

//server
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
require('./config/express.js')(express,app,io);
require('./config/socket-io.js')(io);

//check auction closing for notification
var checkClosingAuction = require('./config/checkClosingAuction.js');
checkClosingAuction.initial(io);

server.listen(3000,console.log('app listenning on port: 3000'));
