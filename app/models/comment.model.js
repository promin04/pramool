var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
  comment : [{
    username : String,
    message : String,
    answer : [{
      username : String,
      message : String
    }]
  }]
});
mongoose.model('Comment',CommentSchema);
