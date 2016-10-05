(function () {
  var app = angular.module('timer',[]);
  app.directive('timer',function () {
    return {
      restrict : 'E',
      templateUrl : './modules/timer/views/timer.jade',
      scope : {milisec : '@'},
      controller : function ($scope) {

      $scope.time = function () {
        var checkpoint;
        var state = false;

        $scope.milisec = $scope.milisec - 1000;
        if($scope.milisec>0){
          $scope.s = Math.floor(($scope.milisec / 1000) % 60);
          $scope.m = Math.floor((($scope.milisec / (60000)) % 60));
          $scope.h = Math.floor((($scope.milisec / (3600000)) % 24));
        } else {

          if(!state){
            clearInterval(clear);
            $scope.s = '00';
            $scope.m = '00';
            $scope.h = '00';
            state = true;
            checkpoint = moment();
            setInterval(function(){ $scope.$apply($scope.time()) }, 45000);
          }
          ///moment().fromnow min. time diff is 45 s
          $scope.fromNow = moment(checkpoint-$scope.milisec).fromNow();

        }


      }

      var clear = setInterval(function(){
          $scope.$apply($scope.time());
      }, 1000);


      }


    }
  })
})()
