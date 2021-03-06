(function () {
  angular.module('main')
    .service('modalAuthService',['modalService',function (modalService) {


           this.open =function (closed) {

             var option = {
               type: 'logIn',
               windowClass: 'noAnimate',
               backdropClass: 'noAnimate',
               animation : true,
               templateUrl : './modules/main/views/signin-modal.jade',
               controller : ['modalService','$http','$rootScope','$uibModalInstance',function (modalService,$http,$rootScope,$uibModalInstance) {
                     var modalLogin = this;
                     this.errorMessage = '';
                     this.login = function () {
                       $http.post('/api/signin',modalLogin.user).then(
                         function success(response) {

                             $rootScope.user = response.data.username;
                             $rootScope.avatarImage = response.data.avatarImage;
                             $uibModalInstance.close();

                         },
                         function reject(response) {
                              modalLogin.errorMessage = response.data.errorMessage;
                         }
                     );
                 };
                       this.pressButton = false;
                       this.openSignup = function () {
                         var option = {
                           type: 'signUp',
                           windowClass: 'noAnimate',
                           backdropClass: 'noAnimate',
                           animation : true,
                           templateUrl : './modules/main/views/signup-modal.jade',
                           controller: ['$http','modalService',function ($http,modalService) {
                             var modalSignup = this ;
                             this.modalClose = function () {
                               var close = document.getElementById('close');
                               angular.element(document).ready(function () {
                                  close.click();
                              });
                             }

                             this.signup = function (formInvalid) {
                               var user = modalSignup.user;
                               var validate = formInvalid || false;
                               if ( validate ) {
                                 this.pressButton = true;
                                 return ;
                               }
                               $http.post('/api/signup', user).then(function (response) {

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
