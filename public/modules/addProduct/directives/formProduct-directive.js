(function () {
  angular.module('addProduct')
    .directive('formProduct',function () {
      return {
        restrict: 'A',
        templateUrl : './modules/addProduct/views/formProduct.jade'
      };
    });
})()
