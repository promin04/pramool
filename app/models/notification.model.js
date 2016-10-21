var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NotificationSchema = new Schema({
  user_id : String ,
  unread : Number ,
  notification : Array
});
mongoose.model('Notification',NotificationSchema);
