(function () {
  angular.module('main')
    .service('userService',['$q','$rootScope','$http',
    function ($q,$rootScope,$http) {
      this.getUser = function () {
            if(!$rootScope.user){
              var defer = $q.defer();
              $http.get('/user').then(function (response) {

                if(response.data.username){
                  $rootScope.user = response.data.username;
                  defer.resolve(response.data.username);
                } else {
                  defer.reject('user unlog-in');
                }
              }
            );
            return defer.promise;
          } else {
            console.log('already login');
          }

      }

    }])
})()
