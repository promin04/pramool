(function () {
  angular.module('addProduct')
    .directive('addProduct',[
      function () {

        return  {
            restrict: 'A',
            templateUrl : './modules/addProduct/views/addProduct.jade',
            scope : { resolve : '=' },
            controller: 'addProductController',
            controllerAs : 'product'
          };
    }]);
})()
