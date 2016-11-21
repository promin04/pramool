(function () {
  angular.module('comment')
    .directive('contenteditable', ['$sce', function($sce) {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
      };

      // Listen for change events to enable binding

      element.on('keyup ', function(event) {
        var html = element.html();
        html = html
        .replace( new RegExp('<div><br></div>', 'g') , '<br />' )
        .replace( new RegExp('<div>', 'g') , '<br />' )
        .replace( new RegExp('</div>', 'g') , '' )
        .replace( new RegExp('^<br />') , '' );
        ngModel.$setViewValue(html);
      });

    }
  };
}]);
})()
