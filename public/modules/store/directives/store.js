(function () {
  var app = angular.module('store');
  app.directive('store',function () {
    return {
      restrict: 'A',
      templateUrl : './modules/store/views/store.jade',
      controller : 'storeController',
      controllerAs : 'store'
    };
  });



})();
