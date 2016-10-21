var Following = require('mongoose').model('Following');
module.exports = {
  createFollow : function (req,res) {
    var following = new Following({
      user_id : req.user._id,
      following : [],
      unread : 0,
      notification : []
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
      req.follow = {
                    _id : req.body._id ,
                    by : 'follow',
                    mode : req.body.mode
                  };
      next();
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

  notification : function (req,res,next) {

    var notification;
    switch ( req.follow.by ) {
      case 'bider':
        notification =  { username : req.user.username ,
                          type : 'bider' ,
                          message : req.product.bider.price ,
                          product : {
                                      _id : req.product._id ,
                                      name : req.product.name
                                    }
                        };
        break;
      case 'creator':
        notification =  { username : req.user.username ,
                          type : 'creator' ,
                          message : 'Your product has been created' ,
                          product : {
                                      _id : req.product._id ,
                                      name : req.product.name
                                    }
                        };
        break;
      default: notification = null;
    }
    var follower = req.product.following;
    var condition;
    var update;
    var i = 0;



    update = {
              $push : { notification : notification } ,
              $inc : { unread : 1 }
             };

    follower.forEach( function (item) {
      var client; // var for client ID
      //detect follower is online or not & set client ID
      for (var i = 0; i < GLOBAL.clients.length; i++) {
        if(GLOBAL.clients[i].username == item.username){
          client = GLOBAL.clients[i].clientId;
          console.log(' client ID ' , client);
          break;
        }
      }

      condition = { user_id : item._id };
      //save notification to database for history & offline's users
      Following.findOneAndUpdate( condition , update , {} , function (err,data) {
        if(client) req.io.to(client).emit('notification');   //emit notification to client that online right now
        if(err) next(err);
        i++;
        if(i === follower.length) next(); // check last process to call next()
      });
    });

  },

  getNotification : function (req,res,next) {
    if( req.user ){
    var condition = { user_id : req.user._id };
    var field = { notification : true , unread : true };
    Following.findOne( condition ,'notification unread' , function (err,data) {
        if( err ) next(err);

        req.follow = data;
      //  console.log('getNotification',data);
        next();
    })
  } else {
    console.log('get notification need login');
  }
  },

  send : function (req,res) {
    //console.log('send req.follow' , req.follow );
     res.json(req.follow);
  }

}
