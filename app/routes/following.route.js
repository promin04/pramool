module.exports = function (app) {
  var following = require('../controllers/following.controller.js');

  app.route( '/get-notification' )
     .get( following.getNotification , following.send );
  }
