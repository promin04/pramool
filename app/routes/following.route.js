module.exports = function (app) {
  var following = require('../controllers/following.controller.js');

  app.route( '/get-notification/:page&:new' )
     .get( following.getNotification , following.send );


  app.route( '/read-notification' )
     .get( following.readNotification , following.send );

}
