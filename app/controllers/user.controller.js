var User = require('mongoose').model('User');
var passport = require('passport');
var jwt = require('jsonwebtoken');
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
  if(req.user){
    var user = {
      username : req.user.username,
      avatarImage : req.user.avatarImage
    };
    res.json(user);
  } else {
    res.end();
  }


}

exports.login = function(req, res , next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.status(401).json( { errorMessage : 'Incorrect username or password' } );
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      var token = jwt.sign( { _id : user._id.toString() } , 'prommin' , { expiresIn : '1d'} );

      return res.json({
        username : user.username ,
        avatarImage : user.avatarImage ,
        token : token
      });
    });
  })(req, res, next);
}

exports.setAvatar = function(req, res , next){
  
  var condition = { _id : req.user._id };
  var update = {
    $set : { avatarImage : req.body }
  };
  var option = {
    new : true,
    fields : {
      avatarImage : true
    }
  }
   User.findOneAndUpdate(condition,update,option,function (err,data) {
      res.json(data);
   });
}
