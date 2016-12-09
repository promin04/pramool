var User = require('mongoose').model('User');
var passport = require('passport');
var jwt = require('jsonwebtoken');

module.exports = {
  signup ,
  signout,
  getUsername,
  login,
  setAvatar
};

//-------------------------------------------------------------------------------
//signup
//------------------------------------------------------------------------------
function signup(req,res,next) {
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


//-------------------------------------------------------------------------------
//signout
//------------------------------------------------------------------------------
function signout(req, res){
    req.logout();
    res.redirect('/');
}


//-------------------------------------------------------------------------------
//getUsername
//------------------------------------------------------------------------------
function getUsername(req,res) {
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


//-------------------------------------------------------------------------------
//login
//------------------------------------------------------------------------------
function login(req, res , next){
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

//-------------------------------------------------------------------------------
//setAvatar
//------------------------------------------------------------------------------
function setAvatar(req, res , next){

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
