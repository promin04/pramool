(function () {
  angular.module('addProduct')
    .controller( 'sidebarReviewController' , [ '$scope' , function ( $scope ) {
      var that = this;
      console.log($scope.user,'555');
      this.name = $scope.$parent.product.input.name;
      this.bidEnd = ($scope.$parent.product.input.time.days * 24 * 60 * 60 * 1000) + ($scope.$parent.product.input.time.hours * 60 * 60 * 1000);
      this.description = $scope.$parent.product.input.description;
      this.creator = { username : $scope.user };
      this.bider = [{
        price : $scope.$parent.product.input.price,
        name : $scope.user,
        time : 'few second ago',
      }];

      $scope.$watch('user',function(newValue, oldValue) {
        that.bider[0].name = newValue;
        that.creator = { username : newValue };
      });
      $scope.$parent.$watch('product.input',function(newValue, oldValue) {
        that.name = newValue.name;
        that.bidEnd = (newValue.time.days * 24 * 60 * 60 * 1000) + (newValue.time.hours * 60 * 60 * 1000);
        that.description = newValue.description;
        that.bider[0].price = newValue.price;
      },true);
    }] );
})()
