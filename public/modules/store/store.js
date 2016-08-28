(function () {

  var app = angular.module('store',[]);
  app.directive('store',function () {
    return {
      restrict: 'E',
      templateUrl : './modules/store/views/store.jade'
    };
  });
  app.controller('StoreController',function ($scope,$http) {
    var that = this;
    this.add = function (add) {
      $http.post('/product',$scope.mos).then(function(response) {
        that.product.push(response.data);
      });


    $scope.mos =null;
  };
    this.product =  [];

        $http.get('/product').then(function(response) {
          var data = response.data;
          var svTime = data.pop();
          console.log(data[0].bidEnd,svTime);
          for (var i = 0; i < data.length; i++) {
            ////
            //setTime to countdown
            ////
            data[i].time = timeRemain(data[i].bidEnd,svTime);
          }
          that.product=that.product.concat(data);



          function timeRemain(endTime,svTime) {
            var time = {};
            var minus = {};
              //sec
              if( endTime.seconds - svTime.seconds < 0) {
                      minus.m = 1;
                      time.s = endTime.seconds + 60 - svTime.seconds;
              } else {
                      time.s = endTime.seconds - svTime.seconds;
              }
              //min
              if ( endTime.minutes - svTime.minutes < 0) {
                      minus.h = 1;
                      time.m = endTime.minutes + 60 - svTime.minutes;
              } else {
                      time.m = endTime.minutes - svTime.minutes;
              }
              //hours
              if ( endTime.hours - svTime.hours < 0) {
                      minus.d = 1;
                      time.h = endTime.hours + 24 - svTime.hours;
              } else {
                      time.h = endTime.hours - svTime.hours;
              }
              //days
              if ( endTime.date - svTime.date < 0) {
                      minus.d = 1;
                      time.d = endTime.date + 30 - svTime.date;
              } else {
                      time.d = endTime.date - svTime.date;
              }
              console.log(time,minus);
              for(var sub in minus){
                time[sub] = time[sub] - minus[sub];
                console.log(sub);
              }
              console.log(time);
              return time;
          }

        });








  })
})();
