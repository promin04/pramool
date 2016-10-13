var moment = require('moment');
var Product = require('mongoose').model('Product');
module.exports = {
  create : function (req,res) {
      if(req.user){
        console.log(req.body,'JSON');
        var coverImgObj = req.body.img[req.body.coverImg];
        var add = {
          name : req.body.name,
          createAt : moment(),
          bidEnd : moment().add(req.body.time.hours,'hours').add(req.body.time.days, 'days'),
          creator : req.user.username,
          following: [],
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
          }]
        }

        var product = new Product(add);

        product.save(function (err,data) {
          if(err) {
            console.log(err);
          } else {
            console.log(data);
            res.json(data);

          }
        });
      } else {
        console.log('need user log in');
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

   delete : function (req,res) {
     var condition = { _id : req.params.id };
     if(req.user){
       Product.remove(condition,function (err,data) {
         res.json(data);
       });
     }else {
       console.log('need user log in');
     }
   },

   completed : function (req,res) {
     var time = moment()+0;
     Product.find({
         bidEnd : { $lt : time }
     },function (err,data) {
       if (err) {
         console.log(err);
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
       } else {

         req.product = data;
         next();
       }
     })
   },

   read : function (req,res) {
     req.product.bidEnd = moment(req.product.bidEnd).diff(moment());
     req.product.bider[req.product.bider.length-1].time = moment(req.product.bider[req.product.bider.length-1].time).fromNow();
     res.json(req.product);
   },

   offer : function (req,res) {
     if(req.body.price<req.product.bider[req.product.bider.length-1].price || req.user==undefined){
       console.log('Cannot be add new offer');
       res.json({
         error: 'You should login before take offer'
       });
     } else {
       var condition = { _id : req.product._id },
           update = {
             $push : {
                       bider : {
                         name: req.user.username,
                         price: req.body.price,
                         time: moment()
                       }
             }
           };

        Product.findOneAndUpdate(condition,update,{ new : true },function (err,data) {
            if (err) {
              console.log(err);
            } else {
              var result ={
                name : data.name,
                bider : {
                  time: moment(data.bider[data.bider.length-1].time).fromNow(),
                  price:data.bider[data.bider.length-1].price,
                  name:data.bider[data.bider.length-1].name
                }
              }


              console.log(result,'offer555');
              res.json(result);
            }
        });
     }
   },

  getFollowing: function (req,res) {
    if(req.user){
      var username = req.user.username;
      var id = req.user._id;
      var condition = {
        $or : [
          { 'following' : { '$in' : [{'username':username,'_id':id}] } },
          { 'bider.name' : username}
        ]
      };

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
       console.log(data,'following');
       res.json(data);
     }
   )
    }else {
      console.log('need user log in');
    }


 },

 following: function (req,res) {
   if (req.user) {
     var condition = {
       _id : req.body._id
     };
     var update ={};

     var Push = {
       $push : {
                 following : {
                   _id : req.user._id,
                   username : req.user.username
                 }
        }
      };

      var Pull = {
        $pull : {
                  following : {
                         _id : req.user._id,
                         username : req.user.username
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

     Product.findOneAndUpdate(condition,update,{ new : true },function (err,data) {
       console.log('already follow',data);
         res.json(data);
     });
   }else {
     console.log('need user log in');
   }
 }



}
