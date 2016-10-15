var User = require('mongoose').model('User');
exports.signup = function (req,res,next) {
    if(!req.user){
      var user = new User(req.body);
      console.log(req.body);

      user.provider = 'local';
      user.save(function (err,data) {
        if(err){
            console.log(err);
            return res.redirect('/');
        }
          console.log(data);
          req.login(user,function (err) {
            if(err) return next(err);
            res.redirect('/');
            next();
          });

      });

    } else {
      return res.redirect('/');
    }
}

exports.signout = function(req, res){
    req.logout();
    res.redirect('/');
}

exports.username = function (req,res) {
  res.json(req.user);
}
