var Following = require('mongoose').model('Following');
module.exports = {
  createFollow : function (req,res) {
    var following = new Following({
      user_id : req.user._id,
      following : []
    });
    following.save();
  },
  followUser : function (req,res,next) {
    if (req.user) {
      var condition = {
        _id : req.user._id
      };
      var update ={};

      var Push = {
        $push : {
                  following : {
                    _id : req.body._id
                  }
         }
       };

       var Pull = {
         $pull : {
                   following : {
                     _id : req.body._id
                   }
       }
     };

      switch (req.body.mode) {
        case 'follow':
          update = Push;
          break;
        case 'unfollow':
          update = Pull;
          break;
        default: update ={};

      }

      Following.findOneAndUpdate(condition,update,{ new : true },function (err,data) {
        console.log('already followUser',data);
        req.result = data;
        next();
      });
    }else {
      console.log('need user log in');
    }
  }

}
