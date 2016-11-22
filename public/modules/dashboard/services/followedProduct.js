(function () {
  angular.module('dashboard')
    .service('followed',['$http','$state',function ($http,$state) {
        this.product = function () {

        return  $http.get('/following').then(
                  function (response) {
                    return response;
                  },
                  function (err) {
                    $state.go('auction');
                  }
                );
        }

    }])
})()
