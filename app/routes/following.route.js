module.exports = function (app) {
  var following = require('../controllers/following.controller.js');

  app.route( '/get-following' )
     .get( following.getFollowing , following.send );
  }
