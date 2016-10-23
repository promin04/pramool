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
    .controller('authenticate',['$http','modalAuthService','$scope','$rootScope',function ($http,modalAuthService,$scope,$rootScope) {
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

      //get username when user is changed
      $rootScope.$watch('user',function (newValue, oldValue) {
          that.username = newValue;
          if(!oldValue && newValue) {
              $http.get('/get-notification').then(function (response) {
                var unread = response.data.unread;
                var notification = response.data.notification.reverse();
                that.notification = {
                  unread : unread ,
                  notification : notification
                };
                console.log('that.notification',that.notification);
              });
              socket.emit('clientInfo',newValue); //inform socket io when client online

              //listening notification
              socket.on('notification',function (data) {
                that.notification.notification.unshift(data.notification[0]);
                that.notification.unread++;
                console.log('data',data);
              })
          }
      });
      ////




    }]);

})();
