var Following = require('mongoose').model('Following');
var Product = require('mongoose').model('Product');

module.exports = {
  createFollow : function (req,res) {
    var following = new Following({
      user : {
              user_id : req.user._id ,
              username : req.user.username
              },
      following : [],
      unread : 0,
      notification : []
    });
    following.save(function (err,data) {
      res.end();
    })
  },

  setComment : function (req , res , next) {
        if( (req.user.username == req.comment.creator.username) && (req.comment.mode === 'answer') ){
          console.log('all end');
          return res.end();
        }
        req.follow = {
                      _id : req.params._id , //product_id
                      by : 'comment',
                      mode : req.comment.mode
        };
        console.log(req.follow,'req.follow setcomment');
        return next();
  },

  setPreFollow : function (req,res,next) {
    if (req.product) {
      req.follow = {
                    _id : req.product._id ,
                    by : 'follow',
                    mode : req.body.mode
                  };
      return next();
    } else {
      req.follow = {
                    _id : req.body._id ,
                    by : 'follow',
                    mode : req.body.mode
                  };
      return next();
    }
  },

  setCreatorFollow : function (req,res,next) {
    if (req.product) {
      req.follow = {
                    _id : req.product._id ,
                    by : 'creator',
                    mode : 'follow'
                  };
      return next();
    } else {
      console.log('error need req.product');
      return next(err);
    }
  },

  setBiderFollow : function (req,res,next) {
    if (req.product) {
      req.follow = {
                    _id : req.product._id ,
                    by : 'bider',
                    mode : 'follow'
                  };
      return next();
    } else {
      console.log('error need req.product');
      return next(err);
    }
  },

    setPreDelete : function (req,res,next) {
      console.log('setPreDelete');
      if (req.product) {
        req.follow = {
                      _id : req.product._id ,
                      by : 'delete',
                      mode : 'follow'
                    };
        return next();
      } else {
        console.log('error need req.product');
        return next(err);
      }
    },

  notification : function (req,res,next) {
    console.log('notification');
    var notification = {};
    var follower = [];
    var condition;
    var option;
    var update;

        switch ( req.follow.by ) {
          case 'bider':
            notification =  { username : req.user.username ,
                              type : 'bider' ,
                              message : req.product.bider.price ,
                              product : {
                                          _id : req.product._id ,
                                          name : req.product.name,
                                          img : req.product.img
                                        }
                            };
            follower = req.product.following;
            break;

          case 'creator':
            notification =  {
                              type : 'creator' ,
                              product : {
                                          _id : req.product._id ,
                                          name : req.product.name,
                                          img : req.product.img
                                        }
                            };
            follower = [ req.product.creator ];
            break;

          case 'delete':
            notification =  {
                              type : 'delete' ,
                              product : {
                                          _id : req.product._id ,
                                          name : req.product.name,

                                        }
                            };
            follower = req.product.following;
            break;

          case 'close':
            notification =  {
                              type : 'close' ,
                              winner : req.product.winner,
                              product : {
                                          _id : req.product._id ,
                                          name : req.product.name,
                                          img : req.product.img
                                        }
                            };
            follower = req.product.following;
            break;

          case 'comment':
            Product.findOne( { comment_id : req.follow._id } , '_id name creator coverImg img',
            function (err , product) {
              console.log(product,'product findOne');
              var firstRow = req.body.message.split('<br />');
              notification =  { username : req.user.username ,
                                type : 'comment' ,
                                message : firstRow[0] + '....',
                                product : {
                                            _id : product._id ,
                                            name : product.name,
                                            img : product.img[ product.coverImg.index ].link
                                          }
                              };

              switch ( req.comment.mode ) {
                case 'answer':
                    follower = [ { username : req.comment.replied_username } ];
                  break;
                case 'new':
                    follower = [ product.creator ];
                  break;
                default: follower = [ product.creator ];

              }

              /////
                  update = {
                            $push : { notification : notification } ,
                            $inc : { unread : 1 }
                           };

                  var count=1;
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

                    condition = { 'user.username' : item.username };
                    option = {
                               new : true ,
                               fields : {
                                          notification : { $slice: -1 } ,
                                          'user.user_id': true
                                        }
                             };

                    //self-invoke & inject parameter to freeze value for asynchronous process
                    (function (condition , update , option , client ,count) {
                      //save notification to database for history & offline's users
                      Following.findOneAndUpdate( condition , update , option , function (err,data) {
                        if(client) req.io.to(client).emit('notification' , data);   //emit notification to client that online right now
                        if(err) return next(err);

                        if(count === follower.length){
                          console.log('final');
                          return next(); // check last process to call
                        }
                      });

                    })(condition , update , option , client , count)
                    count++;
                  });

            }
          );

            break;
          default: notification = null;
        }


    update = {
              $push : { notification : notification } ,
              $inc : { unread : 1 }
             };
    var count = 1;
    follower.forEach( function (item) {
          var client; // var for client ID
          //detect follower is online or not & set client ID

          for (var i = 0; i < GLOBAL.clients.length; i++) {

            if(GLOBAL.clients[i].username == item.username){
                    client = GLOBAL.clients[i].clientId;
                    console.log(' client ID ' , client);
            }
          }
          condition = { 'user.user_id' : item._id };
          option = {
                     new : true ,
                     fields : {
                                notification : { $slice: -1 } ,
                                user_id: true
                              }
                   };
          //self-invoke & inject parameter to freeze value for asynchronous process
          (function (condition , update , option , client ,count) {
            //save notification to database for history & offline's users
            Following.findOneAndUpdate( condition , update , option , function (err,data) {
              if(client) req.io.to(client).emit('notification' , data);   //emit notification to client that online right now
              if(err) return next(err);
              if(count === follower.length) {
                console.log('final');
                return next(); // check last process to call next()
              }
            });

          })(condition , update , option , client , count)
          count++;
    });

  },

  getNotification : function (req,res,next) {
    if( req.user ){
    var condition = { 'user.user_id' : req.user._id };
    var skip = (+req.params.page * 10) + (+req.params.new);
    var option1 = {
      notification : { $slice: [(-skip),10]  },
      unread: true
    };
    var option2 =[
      { $match : { 'user.user_id' : req.user._id.toString() } }
      ,
      {
          $project: {
                      size: { $size: "$notification" }
          }
      }
  ];
    Following.findOne( condition , option1).lean().exec(
       function (err,data) {
          if( err ) return next(err);
          //console.log('getNotification',data);
          req.follow = data;
          Following.aggregate(option2 , function (err , num) {
            if(err) return next(err);

              req.follow.num = num[0].size;
              console.log('size',req.follow,req.follow.num);

            return next();
          });


      }
    );



  } else {
    console.log('get notification need login');
  }
  },

  readNotification: function (req,res,next) {
    if( req.user ){
    var condition = { 'user.user_id' : req.user._id };
    var update = {
                $set : { unread : 0 }
             };
    var option = {
        new : true ,
        fields : {
                   unread : true
                 }
           };
    Following.findOneAndUpdate( condition , update , option , function (err,data) {
            if( err ) return next(err);
            req.follow = data;
            return next();
        });
    }
  },

  send : function (req,res) {
    //console.log('send req.follow' , req.follow );
     res.json(req.follow);
  }

}
