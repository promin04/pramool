(function () {
  angular.module('store')
    .controller('bottomController' , ['product',function (product) {
      this.comment_id = product.comment_id;
      this.product_id = product._id ;
      
    }]);
})()
