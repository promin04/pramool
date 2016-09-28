(function () {
  angular.module('dashboard')
    .service('myProduct',['$http',function ($http) {
        this.product = function () {

        return  $http.get('/myProduct').then(function (response) {
                  return response;
                });
        }

    }])
})()
