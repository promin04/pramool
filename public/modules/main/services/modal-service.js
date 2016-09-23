(function () {
  angular.module('main')
    .service('modalService',['$uibModal','$timeout',function ($uibModal,$timeout) {
           this.open =function (option,closed) {
              var modalInstance = $uibModal.open(option).closed.then(function () {
                if(closed)
                    closed();
              });
            $timeout(function () {
               var element = document.getElementById("myId");
               if(element)
                    element.focus();
            },200)

          }

    }]
  )
})()
