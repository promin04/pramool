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
    .controller('authenticate',['$http','modalService','$scope',function ($http,modalService,$scope) {
      var that = this;
      this.username = '';
      this.signout = function () {
        $http.get('/signout').then(function () {
          that.username = '';
        });
      }
      $http.get('/user').then(function (response) {
        that.username = response.data.username;
      });

      this.signin = function () {
        var option = {
          animation : true,
          templateUrl : './modules/header/views/signin-modal.jade',
          controller : ['modalService',function (modalService) {
            this.signup = function () {
              var option = {
                animation : true,
                templateUrl : './modules/header/views/signup-modal.jade'
              };
              modalService.open(option);
            }
          }],
          controllerAs : 'user'

        };
        modalService.open(option);
      }



    }])
})();
