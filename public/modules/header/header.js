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
      this.username = $rootScope.user;
      this.signout = function () {
        $http.get('/signout').then(function () {

            $rootScope.user = null;
        });
      }

      this.signin = function () {
        modalAuthService.open();
      }

      //get username when user is changed
      $rootScope.$watch('user',function (newValue, oldValue) {
        that.username = newValue;
      });
      ////




    }])
})();
