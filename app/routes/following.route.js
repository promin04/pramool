module.exports = function (app) {
  var following = require('../controllers/following.controller.js');

  app.route( '/api/get-notification/:page&:new' )
     .get( following.getNotification , following.send );


  app.route( '/api/read-notification' )
     .get( following.readNotification , following.send );

}
