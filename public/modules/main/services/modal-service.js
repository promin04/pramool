(function () {
  angular.module('main')
    .service('modalService',['$uibModal','$timeout',function ($uibModal,$timeout) {
           this.open =function (option) {
              var modalInstance = $uibModal.open(option);
            $timeout(function () {
               var element = document.getElementById("myId");
               if(element)
                    element.focus();
            },200)

          }

    }]
  )
})()
