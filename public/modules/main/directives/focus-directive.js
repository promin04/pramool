(function () {
  angular.module('main')
    .directive('focus',['$timeout',function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        $( document ).ready(function() {
            element.focus();
      });
      /*
        $timeout(function () {
          element.focus();
        }, 1000);
        */
      }

    };
  }]);

})();
