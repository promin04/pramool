var user = require('../controllers/user.controller.js');
var passport = require('passport');
module.exports = function (app) {
  app.route('/signup')
    .post(user.signup);

  app.route('/signin')
    .post(passport.authenticate('local'),
      function (req,res) {
          res.json(req.user.username);
      }
  );

  app.route('/signout')
    .get(user.signout);


  app.route('/user')
    .get(user.username);
}
