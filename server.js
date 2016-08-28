"use strict"
//database
var mongoose = require('mongoose');
mongoose.set('debug',true);
var uri = 'mongodb://localhost/pramool';
var db = mongoose.connect(uri);
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    name : String,
    price : Number,
    createAt : Object,
    bidEnd : Object
});
mongoose.model('Product',ProductSchema);
//server
var app = require('./config/express.js')();

app.listen(3000,console.log('app listenning on port: 3000'));
