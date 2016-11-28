(function () {
  angular.module('main')
    .service('userService',['$q','$rootScope','$http',
    function ($q,$rootScope,$http) {
      this.getUser = function () {
            if(!$rootScope.user){
              var defer = $q.defer();
              $http.get('/api/user').then(function (response) {

                if(response.data){
                  $rootScope.user = response.data.username;
                  $rootScope.avatarImage = response.data.avatarImage;
                  defer.resolve(response.data);
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
