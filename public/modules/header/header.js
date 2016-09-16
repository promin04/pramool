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
