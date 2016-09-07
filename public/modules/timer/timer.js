(function () {
  var app = angular.module('timer',[]);
  app.directive('timer',function () {
    return {
      restrict : 'E',
      template : '<p>{{h}} : {{m}} : {{s}}</p>',
      scope : {milisec : '@'},
      controller : function ($scope) {
      $scope.time = function () {
        $scope.milisec = $scope.milisec - 1000;
        $scope.s = Math.floor(($scope.milisec / 1000) % 60);
        $scope.m = Math.floor((($scope.milisec / (60000)) % 60));
        $scope.h = Math.floor((($scope.milisec / (3600000)) % 24));
      }
      setInterval(function(){ $scope.$apply($scope.time()) }, 1000);
      }


    }
  })
})()
