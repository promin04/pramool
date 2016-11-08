var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name : String,
    createAt : Object,
    bidEnd : Object,
    creator : Object,
    following: Array,
    img : Array,
    coverImg : Object,
    bider :[{
      name : String,
      price : Number,
      time : Object
    }],
    comment_id: String
});

mongoose.model('Product',ProductSchema);
