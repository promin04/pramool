(function () {
  angular.module('header')
    .directive('customScroll',['$http',function ($http) {
    return {
      restrict: 'A',
      transclude: true,
      scope : { noti : '=' },
      link: function (scope, element, attrs) {
        var busy = false;
        element.bind( 'scroll' , function () {
          var Hi = element.height() + 8 ; // 8 is padding
          var scroll_T = element.scrollTop();
          var maxHi = element[0].scrollHeight;
          if( scroll_T >= ( maxHi - Hi ) - 20 && !busy ){
            busy = true;
            console.log('yes');
            scope.noti.page++;
            $http.get('/get-notification/'+scope.noti.page+'&'+scope.noti.new).then(function (response) {

              var notification = response.data.notification.reverse();
              scope.noti.notification = scope.noti.notification.concat(notification);
              console.log(scope.noti.notification.length , scope.noti.num);
              if( scope.noti.notification.length >= scope.noti.num ){
                busy = true;
                console.log(scope.noti.notification);
              } else {
                busy = false;
              }
            });
          }

        });
      }

    };
  }]);

})();
