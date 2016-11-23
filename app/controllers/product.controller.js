var moment = require('moment');
var Product = require('mongoose').model('Product');
var checkClosingAuction = require('../../config/checkClosingAuction.js');

module.exports = {
  create : function (req,res,next) {
      if(req.user){
        console.log(req.body,'JSON');
        var coverImgObj = req.body.img[req.body.coverImg];
        var add = {
          name : req.body.name,
          createAt : moment(),
          bidEnd : moment().add(req.body.time.hours,'hours').add(req.body.time.days, 'days'),
          creator : {
            _id : req.user._id ,
            username : req.user.username
          },
          description : req.body.description,
          following: [{
            _id : req.user._id,
            username : req.user.username
          }],
          img : req.body.img,
          coverImg : {
            index : req.body.coverImg,
            autoW : (coverImgObj.width/coverImgObj.height)*170 ,
            autoH : (coverImgObj.height/coverImgObj.width)*170
          },
          bider :[{
            name : req.user.username,
            price : req.body.price,
            time : moment()
          }],
          comment_id : req.comment._id
        }

        var product = new Product(add);

        product.save(function (err,data) {
          if(err) {
            console.log(err);
            return  next(err);
          } else {
            console.log('save data',data);
            ///for checkClosingAuction
            var forTimecheck = {
              _id : data._id,
              bidEnd : data.bidEnd
            };
            checkClosingAuction.addProduct(forTimecheck);
            ///for notification
            var result ={
              _id : data._id,
              name : data.name,
              creator : data.creator,
              comment_id : data.comment_id,
              img : data.img[data.coverImg.index].link,
              bider : {
                time: moment(data.bider[0].time).fromNow(),
                price:data.bider[0].price,
                name:data.bider[0].name
              },
              following : data.following
            }
            req.product = result;
            return next();
            //res.json(data);

          }
        });
      } else {
        console.log('need user log in');
        res.end();
      }
   },

   list : function (req,res) {

     var time = moment()+0; // it'll be bug $gt need number but moment() is obj{} that return milisec(number) **fixed by +number
      Product.find({
          bidEnd : { $gt : time },
      },
      '_id name bider bidEnd img coverImg'
      ,
      function (err,data) {
        if(err){
          console.log(err);
          res.end();
        }else {

          for (var i = 0; i < data.length; i++) {
            data[i].bidEnd = moment(data[i].bidEnd).diff(moment());
            data[i].bider = data[i].bider[data[i].bider.length-1];
            data[i].bider[0].time = moment(data[i].bider[0].time).fromNow();
          }

          res.json(data);
        }
      })
   },

   delete : function (req,res,next) {
     console.log('product delete');
     if( req.user ){
                       var condition = { _id : req.params.id };
                       Product.findOne(condition,'name creator bidEnd comment_id',function (err ,data) {
                         var result = data;
                         console.log(result,'result');
                         if(data.bidEnd+0 > moment()+0 ){
                           var forTimecheck = {
                             _id : data._id,
                           };
                           checkClosingAuction.deleteProduct(forTimecheck);
                         }


                          if(req.user.username === data.creator.username){

                            Product.remove(condition,function (err) {
                              req.Product = result;
                              return next();
                              //res.json(result);
                            });


                          }else {
                            console.log('error delete',req.user.username , data.creator.username);
                          }

                       });
   }else {
     console.log('need log in');
     res.end();
   }

   },

   completed : function (req,res) {
     var time = moment()+0;
     Product.find({
         bidEnd : { $lt : time }
     },function (err,data) {
       if (err) {
         console.log(err);
         res.end();
       } else {
         for (var i = 0; i < data.length; i++) {
           data[i].bidEnd = moment(data[i].bidEnd).diff(moment());
         }
         console.log(data);
         res.json(data);
       }
     })
   },

   detail : function (req,res,next,id) {
     Product.findOne({
       _id : id
     },
     function (err,data) {
       if (err) {
         console.log(err);
         res.end();
       } else {

         req.product = data;
         next();
       }
     })
   },

   read : function (req , res , next) {

     if ( req.product ) {
           if( Array.isArray(req.product) ) {
              var data = req.product;
             for (var i = 0; i < data.length; i++) {
               data[i].bidEnd = moment(data[i].bidEnd).diff(moment());
               data[i].bider = data[i].bider[data[i].bider.length-1];
               data[i].bider.time = moment(data[i].bider.time).fromNow();
             }
             req.product = data;
             next();
           }else {
             req.product.bidEnd = moment(req.product.bidEnd).diff(moment());
             req.product.bider[req.product.bider.length-1].time = moment(req.product.bider[req.product.bider.length-1].time).fromNow();
             res.json(req.product);
           }

     } else {
       res.status(404).end();
     }

   },

   offer : function (req,res,next) {
     console.log('offerrrrrrrrrrr',req.user.username);
     if(req.body.price<req.product.bider[req.product.bider.length-1].price || req.user==undefined){
       console.log('Cannot be add new offer');
       res.status(401).json({
         error: 'You should login before take offer'
       });
     } else {
       var condition = { _id : req.product._id };
       var   update = {
             $push : {
                       bider : {
                         name: req.user.username,
                         price: req.body.price,
                         time: moment()
                       }
             }
           };
       var option = { fields: {
                                createAt : false ,
                                bidEnd : false ,
                                bider : { $slice: -1 }
                              },
                       new : true
                     };


        Product.findOneAndUpdate(condition,update,option,function (err,data) {
            if (err) {
              console.log(err);
              res.end();
            } else {
              //web socket emit to everyone in store and product's room
              var offer = {
                product_id: data._id.toString(),
                data: {
                  time: moment(data.bider[0].time).fromNow(),
                  price:data.bider[0].price,
                  name:data.bider[0].name
                },
                name:data.name
              }
              req.io.to(offer.product_id).emit('offer',offer);
              req.io.to('store').emit('offer',offer);

              // set req.product for next middle ware
              var result ={
                _id : data._id,
                name : data.name,
                creator : data.creator,
                img : data.img[data.coverImg.index].link,
                bider : {
                  time: moment(data.bider[0].time).fromNow(),
                  price:data.bider[0].price,
                  name:data.bider[0].name
                },
                following : data.following
              }
              req.product = result;
              console.log(result,'offer');
              next();

            }
        });
     }
   },

  getFollowing: function (req,res) {
     console.log(req.headers ,'headerssss');
    if(req.user){
      var username = req.user.username;
      var id = req.user._id;
      var condition =  { 'following.username' : { '$in' : [username] } };

     Product.find(
       condition
       ,
     'name bidEnd creator bider img following coverImg'
     ,{
       $slice:['bider',-1]
     },
     function (err,data) {
       for (var i = 0; i < data.length; i++) {

         data[i].bidEnd = moment(data[i].bidEnd).diff(moment());

       }

       res.json(data);
     }
   )
    }else {
      res.status(401).end();
      console.log('need user log in');
    }


 },

 followProduct: function (req,res,next) {
   if (req.user) {

              var by = req.body.by || 'follow';
              var _id = req.body._id || req.product._id;
               if (by === 'follow') {
                       var condition = {
                         _id : _id
                       };
                       var update ={};

                       var Push = {
                         $push : {
                                   following : {
                                     _id : req.user._id.toString(),
                                     username : req.user.username
                                   }
                          }
                        };

                        var Pull = {
                          $pull : {
                                    following : {
                                           _id : req.user._id.toString(),
                                           username : req.user.username
                                    }
                        }
                      };

                      var mode = req.body.mode || 'follow';
                       switch ( mode ) {
                         case 'follow':
                           update = Push;
                           //prevent following duplication
                           if( req.product ){
                             var follow = req.product.following;
                             var user = req.user._id.toString();
                             for(var i = 0 ; i < follow.length ; i++){
                               if ( follow[i]._id == user ) return next(); //return for skip remaining process below
                             }
                           }
                           break;
                         case 'unfollow':
                           update = Pull;
                           break;
                         default: update ={};
                       }


                       Product.findOneAndUpdate(condition,update,{ new : true },function (err,data) {
                         console.log('already followProduct',data);
                          //req.product = data;
                          return next();
                       });
             }else {
               next();
             }

   }else {
     console.log('need user log in');
     res.end();
   }
 },

 send : function (req,res) {
    res.json(req.product);
 },

 end : function (req,res) {
   console.log('end');
    res.end();
 },

search : function (req , res , next ) {
  var condition = { name : { $regex : req.query.searchText } };
  Product.find( condition , '_id name bider bidEnd img coverImg' )
  .lean()
  .exec(
      function (err, data){
        console.log(data);
        req.product = data;
        next();
      }
  );
}


}
