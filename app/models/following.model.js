var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var followingSchema = new Schema({
  user_id : {type:String , index:true} ,
  following : Array,
  unread : Number ,
  notification : Array
});
mongoose.model('Following',followingSchema);
