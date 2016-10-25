(function () {
  angular.module('main')
    .service('modalService',['$uibModal','$timeout',function ($uibModal,$timeout) {
           var modal = this;
           this.hasModalLogin = false;
           this.open =function (option,closed) {
             switch (option.type) {
               case 'logIn':
                              if( !modal.hasModalLogin ){
                                  modal.hasModalLogin = true;
                                  var modalInstance = $uibModal.open(option).closed.then(function () {
                                    modal.hasModalLogin = false;
                                    if(closed)
                                        closed();
                                  });

                                  $timeout(function () {
                                     var element = document.getElementById("myId");
                                     if(element)
                                          element.focus();
                                  },200)
                                  console.log('logIn');

                              }

                 break;
               case 'signUp':
                             var modalInstance = $uibModal.open(option).closed.then(function () {

                             });

                             console.log('signUp');
                 break;
               default:

             }


          }

    }]
  )
})()
