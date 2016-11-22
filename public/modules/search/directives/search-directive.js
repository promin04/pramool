(function () {
  angular.module('search')
    .directive('searchBar' , function () {
      return {
        templateUrl : './modules/search/views/search.jade',
        controller : 'searchController',
        controllerAs : 'searchBar',
        restrict: 'E'
      };
    });
})()
