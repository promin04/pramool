(function () {
  angular.module('header')
    .directive('navHeader',function () {
    return {
      restrict: 'E',
      templateUrl : './modules/header/views/header.jade'
    };
  })
    .controller('authenticate',['$http',function ($http) {
      var user = this;
      user.username = '';
      user.signout = function () {
        $http.get('/signout').then(function () {
          user.username = '';
        });
      }
      $http.get('/user').then(function (response) {
        user.username = response.data.username;
      });
    }])
})();
