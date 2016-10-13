(function () {
  var app = angular.module('addProduct');

  app.directive('imageOnload', function() {
      return {
          restrict: 'A',
          scope : {picture : '=' , index : '@' , callback : '&'},
          link: function(scope, element, attrs) {
              element.bind('load', function() {
                  var width = element[0].naturalWidth;
                  var height = element[0].naturalHeight;
                  scope.picture[scope.index].height = height;
                  scope.picture[scope.index].width = width;
                  scope.picture[scope.index].autoW = (width/height)*170 ;
                  scope.picture[scope.index].autoH = (height/width)*170 ;        
                  scope.$apply(scope.callback());
              });
          }
      };
  });


})()
