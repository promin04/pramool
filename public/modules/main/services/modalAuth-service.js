(function () {
  angular.module('main')
    .service('modalAuthService',['modalService',function (modalService) {


           this.open =function (closed) {

             var option = {
               type: 'logIn',
               animation : true,
               templateUrl : './modules/header/views/signin-modal.jade',
               controller : ['modalService','$http','$rootScope','$uibModalInstance',function (modalService,$http,$rootScope,$uibModalInstance) {
                 var modalLogin = this;
                 this.login = function () {
                   $http.post('/signin',modalLogin.user).then(function (response) {
                     $rootScope.user = response.data;
                     $uibModalInstance.close();

                   });
                 };

                       this.openSignup = function () {
                         var option = {
                           type: 'signUp',
                           animation : true,
                           templateUrl : './modules/header/views/signup-modal.jade',
                           controller: ['$http','modalService',function ($http,modalService) {
                             var modalSignup = this ;

                             this.modalClose = function () {
                               var close = document.getElementById('close');
                               angular.element(document).ready(function () {
                                  close.click();
                              });
                             }

                             this.signup = function () {
                               $http.post('/signup',modalSignup.user).then(function (response) {
                                 console.log('complete signup');
                                 modalSignup.modalClose();
                               });
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
