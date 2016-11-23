(function () {
  var app = angular.module('store');
  app.directive('storeCompleted',function () {
    return {
      restrict: 'A',
      templateUrl : './modules/store/views/store-completed.jade',
      controller : 'storeCompleteController',
      controllerAs : 'store'
    };

  });
})()
