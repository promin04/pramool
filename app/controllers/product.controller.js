var moment = require('moment');
var Product = require('mongoose').model('Product');
module.exports = {
  create : function (req,res) {

         var add = {
           name : req.body.name,
           createAt : moment(),
           bidEnd : moment().add(req.body.time.hours,'hours').add(req.body.time.days, 'days'),
           creator : 'mos',
           bider:[{
             name: 'mos',
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
   },

   list : function (req,res) {

     var time = moment()+0; // it'll be bug $gt need number but moment() is obj{} that return milisec(number) **fixed by +number
      Product.find({
          bidEnd : { $gt : time }
      },
      'name bider bidEnd'
      ,
      function (err,data) {
        if(err){
          console.log(err);
        }else {

          for (var i = 0; i < data.length; i++) {
            data[i].bidEnd = moment(data[i].bidEnd).diff(moment());
          }
          console.log(data);
          res.json(data);
        }
      })
   },

   delete : function (req,res) {


     Product.remove({},function (err) {
       if (err) {
         console.log(err);
       }
     })
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
           data[i].bidEnd = moment(data[i].bidEnd).fromNow();
         }
         console.log(data);
         res.json(data);
       }
     })
   },

   detail : function (req,res,next,id) {
     Product.findOne({
       name : id
     },function (err,data) {
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

     res.json(req.product);
   },

   offer : function (req,res) {
     if(req.body.price<req.product.bider[req.product.bider.length-1].price){
       console.log('Cannot be add new offer');
     } else {
       var condition = { _id : req.product._id },
           update = {
             $push : {
                       bider : {
                         name: 'mosss',
                         price: req.body.price,
                         time: moment()
                       }
             }
           };

        Product.findOneAndUpdate(condition,update,{ new : true },function (err,data) {
            if (err) {
              console.log(err);
            } else {
              res.json(data);
            }
        });
     }


   }


}
