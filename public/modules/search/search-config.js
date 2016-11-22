(function () {
  angular.module('search')
    .config(['$stateProvider' , function ($stateProvider) {
      $stateProvider
      .state('search' ,{
        url: '/search?name',
        template:'<div search-page></div>'
      });
    }]);
})()
