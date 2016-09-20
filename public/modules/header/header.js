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
      template : '<h2>S H O W   R O O M</h2>'
    };
  })
    .controller('authenticate',['$http','modalAuthService','$scope',function ($http,modalAuthService,$scope) {
      var that = this;
      this.username = '';
      this.signout = function () {
        $http.get('/signout').then(function () {
          that.username = '';
          window.user = null;
        });
      }
      $http.get('/user').then(function (response) {

        that.username = response.data.username;
        window.user = response.data.username;
      });

      this.signin = function () {
        modalAuthService.open();
      }



    }])
})();
