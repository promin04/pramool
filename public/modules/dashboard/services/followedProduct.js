(function () {
  angular.module('dashboard')
    .service('followed',['$http','$state','$rootScope',function ($http,$state,$rootScope) {
        this.product = function () {

        return  $http.get('/following').then(
                  function (response) {
                     var result = response.data;
                     var myProduct = [];
                     var myFollow = [];
                     for (var i = 0; i < result.length; i++) {

                       if (result[i].creator.username === $rootScope.user) {
                         myProduct.push(result[i]);
                       }else {
                         myFollow.push(result[i]);
                       }
                     }
                     console.log(myProduct,myFollow);
                     return {
                       myProduct : myProduct ,
                       myFollow : myFollow
                     };
                  },
                  function (err) {
                    $state.go('auction');
                  }
                );
        }

    }])
})()
