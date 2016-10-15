var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var followingSchema = new Schema({
  user_id : String ,
  following : Array
});
mongoose.model('Following',followingSchema);
