var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NotificationSchema = new Schema({
  user_id : String ,
  inbox : Array
});
mongoose.model('Notification',NotificationSchema);
