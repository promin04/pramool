var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
  comment : [{
      username : String,
      message : String,
      avatar: {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    answer : [{
        username : String,
        message : String,
        avatar: {
          type : Schema.Types.ObjectId,
          ref : 'User'
      }
    }]
  }]
});
mongoose.model('Comment',CommentSchema );
