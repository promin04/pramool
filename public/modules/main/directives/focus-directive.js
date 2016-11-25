(function () {
  angular.module('main')
    .directive('focus',['$timeout',function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        $( element ).ready(function() {
          $timeout(function () {
            element.focus();
          }, 500);
      });
  
      }

    };
  }]);

})();
