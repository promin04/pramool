(function () {
  angular.module('addProduct')
    .directive('previewProduct',function () {
    return  {
        restrict: 'A',
        templateUrl : './modules/addProduct/views/preview.jade'
      };
    })
})()
