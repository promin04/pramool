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
                      fields : {  comment :
                                            {
                                              $elemMatch : { _id : req.body._id }
                                            }
                               }
                    };
            Comment.findOneAndUpdate( condition , update , option , function (err,data) {
              console.log(data,'comment');
              var result = {
                _id : req.body._id,
                data : data.comment[0].answer.pop(),
                mode : 'answer'
              };
              req.io.to(req.body.product_id).emit('comment',result);
              return res.end();
            });
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

            Comment.findOneAndUpdate( condition , update , option , function (err,data) {
              console.log(data,'comment');
              var result = {
                data : data.comment[0],
                mode : 'new'
              };
              req.io.to(req.body.product_id).emit('comment',result);
              return res.end();
            });
          break;
        default:

      }


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
