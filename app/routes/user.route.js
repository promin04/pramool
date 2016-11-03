var user = require('../controllers/user.controller.js');
var following = require('../controllers/following.controller.js');
var passport = require('passport');
module.exports = function (app) {
  app.route('/signup')
    .post( user.signup , following.createFollow);

  app.route('/signin')
    .post(user.login);

  app.route('/signout')
    .get(user.signout);

  app.route('/user')
    .get(user.username);
    
  app.route('/user-avatar-update')
    .post(user.setAvatar);
}
