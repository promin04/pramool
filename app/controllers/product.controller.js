var moment = require('moment');
var Product = require('mongoose').model('Product');
module.exports = {
  create : function (req,res) {
         var add = {
           name : req.body.name,
           price : req.body.price,
           createAt : moment(),
           bidEnd : moment().add(req.body.time.hours,'hours').add(req.body.time.days, 'days')
         }
         var product = new Product(add);

         product.save(function (err,data) {
           if(err) {
             console.log(err);
           } else {
             res.json(data);
           }
         });
   },

   read : function (req,res) {
    
     var time = moment()+0; // it'll be bug $gt need number but moment() is obj{} that return milisec(number) **fixed by +number
      Product.find({
          bidEnd : { $gt : time }
      },
      function (err,data) {
        if(err){
          console.log(err);
        }else {
          console.log(data);
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
         console.log(data);
         for (var i = 0; i < data.length; i++) {
           data[i].bidEnd = moment(data[i].bidEnd).fromNow();
         }
         res.json(data);
       }
     })
   }
}
