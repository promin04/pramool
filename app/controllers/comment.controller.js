var Comment = require('mongoose').model('Comment');
module.exports = {
    getComment : function (req , res , next) {
      var condition = { _id : req.params._id };
      Comment.findOne( condition , 'comment' , function ( err , data ) {
        return res.json(data);
      });
    },
    postComment : function ( req ,res , next ) {

      switch (req.body.mode) {
        case 'answer':
          console.log('answer');
          var condition = { _id : req.params._id , 'comment._id' : req.body._id };
          var update = {
                    $push : {
                      'comment.$.answer' : {
                                            username : req.user.username,
                                            message : req.body.message
                                          }
                     }
                   };
           var option = {
                      new : true ,
                      fields : {
                                 'comment.answer' : {$slice : -1} ,
                               }
                    };
          break;
        case 'new':
        console.log('new');
          var condition = { _id : req.params._id };
          var update = {
                    $push : {
                              comment : {
                              username : req.user.username,
                              message : req.body.message
                              }
                     }
                   };
           var option = {
                      new : true ,
                      fields : {
                                 comment : {$slice : -1}
                               }
                    };
          break;
        default:

      }

      Comment.findOneAndUpdate( condition , update , option , function (err,data) {
        console.log(data,'comment');
        req.io.to(req.body.product_id).emit('comment',data.comment[0]);
        return res.end();
      });
    },
    create : function (req , res , next) {
      var add = {
        comment : []
      };
      var comment = new Comment(add);
      comment.save(function (err , data) {
        req.comment = data;
        return next();
      });
    }
};
