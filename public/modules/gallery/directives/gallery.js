(function () {
  var app = angular.module('gallery',[]);
  app.directive('gallery',[function () {

    return {
      restrict : 'E',
      templateUrl : './modules/gallery/views/gallery.jade',
      scope : {pic : '=' , pointer : '='},
      controller : 'galleryController'
  }
  }])
})()
