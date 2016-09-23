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
      this.username = '';
      this.signout = function () {
        $http.get('/signout').then(function () {
          that.username = '';

            $rootScope.user = null;
        });
      }
      $http.get('/user').then(function (response) {

        that.username = response.data.username;
        console.log('get user from server');
        $rootScope.user = response.data.username;
      });

      this.signin = function () {
        modalAuthService.open();
      }





    }])
})();
