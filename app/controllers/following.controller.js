var Following = require('mongoose').model('Following');
module.exports = {
  createFollow : function (req,res) {
    var following = new Following({
      user_id : req.user._id,
      following : []
    });
    following.save(function (err,data) {
      res.end();
    })
  },

  setPreFollow : function (req,res,next) {
    if (req.product) {
      req.follow = {
                    _id : req.product._id ,
                    by : 'follow',
                    mode : req.body.mode
                  };
      next();
    } else {
      console.log('error need req.product');
      next(err);
    }
  },

  setCreatorFollow : function (req,res,next) {
    if (req.product) {
      req.follow = {
                    _id : req.product._id ,
                    by : 'creator',
                    mode : 'follow'
                  };
      next();
    } else {
      console.log('error need req.product');
      next(err);
    }
  },

  setBiderFollow : function (req,res,next) {
    if (req.product) {
      req.follow = {
                    _id : req.product._id ,
                    by : 'bider',
                    mode : 'follow'
                  };
      next();
    } else {
      console.log('error need req.product');
      next(err);
    }
  },

  followUser : function (req,res,next) {
    if (req.user) {

      var condition = req.follow.by !== 'bider' ?
      { user_id : req.user._id } :
      { $and : [
          { user_id : req.user._id } ,
          { 'following._id' : { $nin : [ req.follow._id ] } } ,
          { 'following.by' : { $nin : [ 'bider' ] } }
        ]
      };

      var update ={};

      var Push = {
        $push : {
                  following : {
                    _id : req.follow._id ,
                    by : req.follow.by
                  }
         }
       };

       var Pull = {
         $pull : {
                   following : {
                     _id : req.follow._id ,
                     by : req.follow.by
                   }
       }
     };

      var mode = req.follow.mode;


      switch ( mode ) {
        case 'follow':
          update = Push;
          break;
        case 'unfollow':
          update = Pull;
          break;
        default: update ={};

      }

      Following.findOneAndUpdate( condition , update , { new : true } , function (err,data) {
        if( err ) next(err);
        var follow = data.following;
        var result = [];
        for(var i = 0 ; i < follow.length ; i++ ){
          result.push(follow[i]._id.toString()); // all _id is an objectId that why have to pass toString() for indexOf will be worked well.
        }
        result = result.filter( function ( item , index , array ) {
                                    return array.indexOf(item) == index ;
                });

        req.follow = result;
        //req.follow = data.following.pop()._id.toString();
        console.log('already followUser',req.follow);
        next();
      });
    }else {
      console.log('need user log in');
    }
  },

  getFollowing : function (req,res,next) {
    if( req.user ){
    var condition = { user_id : req.user._id };
    var field = { following : true }
    Following.findOne( condition , field , function (err,data) {
        if( err ) next(err);
        var follow = data.following;
        var result = [];
        for(var i = 0 ; i < follow.length ; i++ ){
          result.push(follow[i]._id.toString()); // all _id is an objectId that why have to pass toString() for indexOf will be worked well.
        }
        result = result.filter( function ( item , index , array ) {
                                    return array.indexOf(item) == index ;
                });

        req.follow = result;
        console.log('result',result);
        next();
    })
  } else {
    console.log('get following need login');
  }
  },

  send : function (req,res) {
    console.log('send req.follow' , req.follow );
     res.json(req.follow);
  }

}
