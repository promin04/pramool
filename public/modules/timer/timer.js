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
        var countdown = function () {
          if($scope.milisec>0){
            $scope.s = Math.floor(($scope.milisec / 1000) % 60);
            $scope.m = Math.floor((($scope.milisec / (60000)) % 60));
            $scope.h = Math.floor((($scope.milisec / (3600000)) % 24));
          } else {

            if(!state){
            
              $scope.s = '00';
              $scope.m = '00';
              $scope.h = '00';
              state = true;
              checkpoint = moment();

            }
            ///moment().fromnow min. time diff is 45 s
            $scope.fromNow = moment(checkpoint-$scope.milisec).fromNow();

          }
        };
        $scope.$watch('milisec', function(newValue, oldValue) {
          if ( newValue !== oldValue ) {
            countdown();
          }
        });
      };
      ///initial app
      $scope.time();



      }


    }
  })
})()
