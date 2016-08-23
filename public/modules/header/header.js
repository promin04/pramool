(function () {
  var app = angular.module('header',[]);
  app.directive('navHeader',function () {
    return {
      restrict: 'E',
      templateUrl : './modules/header/views/header.jade'
    };
  });
})();
