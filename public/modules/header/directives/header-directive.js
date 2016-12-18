(function () {
  angular.module('header')
    .directive('topHeader',function () {
    return {
      restrict: 'E',
      templateUrl : './modules/header/views/top-header.jade'
    };
  })
    .directive('subHeader',function () {
    return {
      restrict: 'E',
      templateUrl : './modules/header/views/sub-header.jade'
    };
  })
})();
