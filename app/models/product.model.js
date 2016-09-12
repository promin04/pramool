var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name : String,
    createAt : Object,
    bidEnd : Object,
    creator : String,
    bider:[{
      name: String,
      price: Number,
      time: Object
    }]
});

mongoose.model('Product',ProductSchema);
