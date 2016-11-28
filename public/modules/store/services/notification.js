(function () {
  angular.module('store')
    .service('notification',['$http',function ($http) {

      this.getlist = function () {
        return  $http.get('/api/get-following')
        .then(function (response) {
            console.log('already follow',response.data);
            return response.data;
        });
      };



    }])
})()
