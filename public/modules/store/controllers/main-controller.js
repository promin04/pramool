(function () {
  angular.module('store')
    .controller('mainController' , ['product',function (product) {
      this.comment_id = product.comment_id;
      this.product_id = product._id ;
      this.picture = product.img.reduce(function(total, value, i) {
            total[i] = value;
            return total;
      }, {});
      this.coverImg = product.coverImg.index;
    
    }]);
})()
