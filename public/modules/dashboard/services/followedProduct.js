(function () {
  angular.module('dashboard')
    .service('followed',['$http',function ($http) {
        this.product = function () {

        return  $http.get('/following').then(function (response) {
                  return response;
                });
        }

    }])
})()
