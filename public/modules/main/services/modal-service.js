(function () {
  angular.module('main')
    .service('modalService',['$uibModal','$timeout',function ($uibModal,$timeout) {
           var modal = this;
           this.hasModalLogin = false;

           this.open =function (option,closed) {
             switch (option.type) {

               //when type modal is logIn
               case 'logIn':
                              if( !modal.hasModalLogin ){
                                   modal.hasModalLogin = true;
                                   $uibModal.open(option).closed.then(function () {
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

              //when type modal is signUp
               case 'signUp':
                              $uibModal.open(option);
                             console.log('signUp');
                 break;

                //when type modal is signUp
               default:
                       $uibModal.open(option).closed.then(function () {
                         if(closed)
                             closed();
                       });

                break;
             }


          }

    }]
  )
})()
