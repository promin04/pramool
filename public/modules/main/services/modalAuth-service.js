(function () {
  angular.module('main')
    .service('modalAuthService',['modalService',function (modalService) {
           this.open =function (closed) {
             var option = {
               animation : true,
               templateUrl : './modules/header/views/signin-modal.jade',
               controller : ['modalService','$http','$rootScope','$uibModalInstance',function (modalService,$http,$rootScope,$uibModalInstance) {
                 var that = this ;
                 this.login = function () {
                   $http.post('/signin',that.user).then(function (response) {
                     $rootScope.user = response.data;
                     $uibModalInstance.close();
                   });
                 };

                 this.openSignup = function () {
                   var option = {
                     animation : true,
                     templateUrl : './modules/header/views/signup-modal.jade',
                     controller: ['$http',function ($http) {

                       this.signup = function () {

                       };

                     }],
                     controllerAs: 'signup'
                   };
                   modalService.open(option,closed);

                 }
               }],
               controllerAs : 'login'

             };
             modalService.open(option,closed);

          }

    }]
  )
})()
