(function () {
  angular.module('header')
    .directive('navHeader',function () {
    return {
      restrict: 'E',
      templateUrl : './modules/header/views/header.jade'
    };
  })
    .directive('topHeader',function () {
    return {
      restrict: 'E',
      templateUrl : './modules/header/views/top-header.jade'
    };
  })
    .controller('authenticate',['$http','modalAuthService','$scope','$rootScope','$compile',function ($http,modalAuthService,$scope,$rootScope,$compile) {
      var that = this;
      this.popover = {
        title : "Notification",
        templateUrl : "./modules/header/views/notification.jade"
      };
      this.username = undefined;
      this.notification = {};
      this.signout = function () {
        $http.get('/signout').then(function () {
            $rootScope.user = null;
            socket.emit('clientLogout');

        });
      }

      this.signin = function () {
        modalAuthService.open();
        socket.removeListener('notification');
      }



      this.infiniteScroll_att = function () {
            var $el = $( ".popover-content" );
            $el.attr( "custom-scroll", "" );
            $el.attr( "noti", "user.notification" );
            $compile($el)($scope);
            $http.get('/read-notification').then(function (response) {
               that.notification.unread = response.data.unread;
            })
      }



      //get username when user is changed
      $rootScope.$watch('user',function (newValue, oldValue) {
          that.username = newValue;
          if(!oldValue && newValue) {
              $http.get('/get-notification/1&0').then(function (response) {
                var unread = response.data.unread;
                var notification = response.data.notification.reverse();
                var num = response.data.num;
                that.notification = {
                  unread : unread ,
                  notification : notification ,
                  num : num,
                  page : 1,
                  new : 0
                };
                console.log('that.notification',that.notification);
              });
              socket.emit('clientInfo',newValue); //inform socket io when client online

              //listening notification
              socket.on('notification',function (data) {
                that.notification.notification.unshift(data.notification[0]);
                that.notification.new++;
                that.notification.num++;
                that.notification.unread++;
                console.log('data',data);
              })
          }
      });
      ////




    }]);

})();
