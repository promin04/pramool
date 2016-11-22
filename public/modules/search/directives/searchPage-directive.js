(function () {
  angular.module('search')
    .directive('searchPage' , function () {
      return {
        templateUrl : './modules/search/views/searchPage.jade',
        controller : 'searchPageController',
        controllerAs : 'store',
        restrict: 'A'
      };
    });
})()
