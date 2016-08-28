var moment = require('moment');
var Product = require('mongoose').model('Product');
module.exports = {
  create : function (req,res) {
         var add = {
           name : req.body.name,
           price : req.body.price,
           createAt : moment().toObject(),
           bidEnd : moment().add(req.body.time.hours,'hours').add(req.body.time.days, 'days').toObject()
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
      Product.find({},function (err,data) {
        if(err){
          console.log(err);
        }else {
          var idleTime = moment().toObject();
          data.push(idleTime);
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
   }
}
