var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name :  {
                 type: String ,
                 required: true,
                 index: true
     },
    createAt : Object,
    bidEnd : Object,
    creator : Object,
    description : {
      size : Object,
      weight : String,
      detail : String,
      condition : String
    },
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

//ProductSchema.index({name: 'text'});

mongoose.model('Product',ProductSchema);
