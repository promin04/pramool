(function () {
  angular.module('main')
    .service('modalService',['$uibModal',function ($uibModal) {
           this.open =function (option) {
              var modalInstance = $uibModal.open(option);

              modalInstance.result.then(function () {
                console.log('555555');
              })
          }

    }]
  )
})()
