var Product = require('mongoose').model('Product');
var Following = require('mongoose').model('Following');
var moment = require('moment');
var following_controller = require('../app/controllers/following.controller.js');
var arrayStore = [];

exports.initial = function (io) {

                 var currentTime = moment();
                 var condition = { bidEnd : { $gt : +currentTime }};

                 var saveAndEmit = function (picker) {
                   var condition = { _id : picker._id };
                   var option = {
                      name : true,
                      following : true,
                      img : true,
                      'coverImg.index' : true,
                      bider : { $slice: -1 }
                   }

                   Product.findOne( condition , option , function (err,data) {

                     var preClose = {
                                      io : io,
                                      product: {
                                                _id : picker._id ,
                                                name : data.name ,
                                                following : data.following,
                                                winner : data.bider[0],
                                                img : data.img[data.coverImg.index].link
                                      },
                                      follow: {
                                                _id : picker._id ,
                                                by : 'close',
                                                mode : 'follow'
                                      }
                                 };
                    var callback = function () { console.log('all done'); }

                    following_controller.notification( preClose , {} , callback);

                   });



                  //req.io.to(client).emit('notification' , data);
                 }

                 ///countdown for each of product
                 var countdown =  function () {
                                     console.log('run',arrayStore.length);
                                     for (var j = 0; j < arrayStore.length; j++) {
                                       if( arrayStore[j].bidEnd > 0 ){
                                         arrayStore[j].bidEnd = arrayStore[j].bidEnd-1000 ;
                                       } else {
                                         var picker = arrayStore.splice(j,1);
                                         console.log('this product is closed',picker);
                                         saveAndEmit(picker[0]);
                                       }
                                     }
                                     setTimeout( countdown , 1000 )
                   }
                   ///setTimeRemain by moment for each of product
                   var setTimeRemain = function () {
                     for( var i = 0 ; i < arrayStore.length ; i++ ) {

                          ( function (index) {
                            ///calculate time remaining
                           arrayStore[index].bidEnd = moment(arrayStore[index].bidEnd).diff(moment());
                           //if last loop
                           if ( index === arrayStore.length-1 ) {
                                ///countdown
                                countdown();

                           }
                         }
                         )(i);

                     }
                   }

                 Product.find(condition,'_id bidEnd',function (err,data) {
                   arrayStore = data;
                   if( arrayStore.length === 0 ) countdown();

                   setTimeRemain();

                 });

}

 exports.addProduct = function (product) {
                    product.bidEnd = moment(product.bidEnd).diff(moment());
                    arrayStore.push(product);

}

  exports.deleteProduct = function (product) {
                    for (var i = 0; i < arrayStore.length; i++) {
                      if( arrayStore[i]._id.toString() == product._id.toString() ){
                        var picker = arrayStore.splice(i,1);
                      }
                    }


}
