(function () {
  angular.module('search')
    .service('search',['$http',function ($http) {
      this.get = function (name) {
        return $http.get(`/api/search?searchText=${name}`);
      }
    }]);
})()
