var user = require('../controllers/user.controller.js');
var following = require('../controllers/following.controller.js');
var passport = require('passport');
module.exports = function (app) {
  app.route('/api/signup')
    .post( user.signup , following.createFollow);

  app.route('/api/signin')
    .post(user.login);

  app.route('/api/signout')
    .get(user.signout);

  app.route('/api/user')
    .get(user.getUsername);

  app.route('/api/user-avatar-update')
    .post(user.setAvatar);
}
