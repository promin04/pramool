(function () {
  angular.module('main')
    .service('modalService',['$uibModal',function ($uibModal) {
           this.open =function (option) {
              var modalInstance = $uibModal.open(option);

          }

    }]
  )
})()
