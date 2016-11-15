(function () {
  var app = angular.module('gallery',[]);
  app.directive('gallery',['$timeout',function ($timeout) {
    var link = function (scope , element , attrs) {

      $timeout(function () {
        var el = element.find('.slideshow-sample');

        var hi = el.height() + element.height();
        element.height(hi);
      }, 10);
    }
    return {
      restrict : 'E',
      templateUrl : './modules/gallery/views/gallery.jade',
      scope : {pic : '=' , pointer : '='},
      controller : 'galleryController',
      link:link
  }
  }])
})()
