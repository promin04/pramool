var Comment = require('mongoose').model('Comment');
module.exports = {
    getComment : function (req , res , next) {

      var condition = { _id : req.params._id };
      Comment.findOne( condition , 'comment' )
       .populate('comment.avatar comment.answer.avatar' , 'avatarImage').lean().exec(
            function (err,data) {
              console.log(data.comment,'data.avatar');
              return res.json(data);
             }
        );
    },
    postComment : function ( req ,res , next ) {

      switch (req.body.mode) {
        case 'answer':

          var condition = { _id : req.params._id , 'comment._id' : req.body._id };
          var update = {
                    $push : {
                      'comment.$.answer' : {
                                            username : req.user.username,
                                            message : req.body.message,
                                            avatar : req.user._id
                                          }
                     }
                   };
           var option = {
                      new : true ,
                      fields : {  comment :
                                            {
                                              $elemMatch : { _id : req.body._id }
                                            }
                               }
                    };
            Comment.findOneAndUpdate( condition , update , option )
            .populate('comment.answer.avatar' , 'avatarImage').lean().exec(
                function (err,data) {
                   var result = {
                     _id : req.body._id,
                     data : data.comment[0].answer.pop(),
                     mode : 'answer',
                     replied_username : req.body.replied_username
                   };
                   req.io.to(req.body.product_id).emit('comment',result);
                   req.comment = result;
                   return next();
                 }
            );

          break;
        case 'new':
        console.log('new');
          var condition = { _id : req.params._id };
          var update = {
                    $push : {
                              comment : {
                              username : req.user.username,
                              message : req.body.message,
                              avatar : req.user._id
                              }
                     }
                   };
                   console.log(update,'update');
           var option = {
                      new : true ,
                      fields : {
                                 creator : 1 ,
                                 comment : {$slice : -1}
                               }
                    };

            Comment.findOneAndUpdate( condition , update , option )
            .populate('comment.avatar' , 'avatarImage').lean().exec(
                function (err,data) {
                  console.log(data,'comment');
                  var result = {
                    data : data.comment[0],
                    mode : 'new'
                  };
                  req.io.to(req.body.product_id).emit('comment',result);
                   result.creator = data.creator;
                   req.comment = result;
                   return next();
                }
            );



          break;
        default:

      }


    },
    create : function (req , res , next) {
      var add = {
        product_id : '',
        creator : {},
        comment : []
      };
      var comment = new Comment(add);
      comment.save(function (err , data) {
        req.comment = data;
        return next();
      });
    },

    update : function (req , res , next) {
      console.log( req.product ,'req.product');
      var condition = { _id : req.product.comment_id };
      var update = {
        $set : {
                  product_id : req.product._id,
                  creator : req.product.creator

        }
      };
      var option = {
        new: true,
        fields: 'creator'
      };
      Comment.findOneAndUpdate( condition , update , option )
      .exec(
        function (err , data) {
          return next();
        }
      );
    },

    delete : function ( req , res , next ) {
      console.log('comment delete');
      var condition = { _id : req.product.comment_id };
      Comment.remove( condition , function (err) {
        if(err) next(err);
        return next();
      } );
    }
};
