var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name : String,
    price : Number,
    createAt : Object,
    bidEnd : Object
});

mongoose.model('Product',ProductSchema);
