(function () {
  angular.module('main')
    .service('modalAuthService',['modalService',function (modalService) {
           this.open =function (closed) {
             var option = {
               animation : true,
               templateUrl : './modules/header/views/signin-modal.jade',
               controller : ['modalService',function (modalService) {
                 this.signup = function () {
                   var option = {
                     animation : true,
                     templateUrl : './modules/header/views/signup-modal.jade'
                   };
                   modalService.open(option,closed);

                 }
               }],
               controllerAs : 'user'

             };
             modalService.open(option,closed);

          }

    }]
  )
})()
