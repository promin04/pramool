(function () {
  angular.module('main')
    .service('modalAuthService',['modalService',function (modalService) {


           this.open =function (closed) {

             var option = {
               type: 'logIn',
               windowClass: 'noAnimate',
               backdropClass: 'noAnimate',
               animation : true,
               templateUrl : './modules/header/views/signin-modal.jade',
               controller : ['modalService','$http','$rootScope','$uibModalInstance',function (modalService,$http,$rootScope,$uibModalInstance) {
                     var modalLogin = this;
                     this.errorMessage = '';
                     this.login = function () {
                       $http.post('/signin',modalLogin.user).then(
                         function success(response) {
                              console.log('loginnnnn',response.data);
                             $rootScope.user = response.data.username;
                             $rootScope.avatarImage = response.data.avatarImage;
                             $uibModalInstance.close();

                         },
                         function reject(response) {
                              modalLogin.errorMessage = response.data.errorMessage;
                         }
                     );
                 };

                       this.openSignup = function () {
                         var option = {
                           type: 'signUp',
                           windowClass: 'noAnimate',
                           backdropClass: 'noAnimate',
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
