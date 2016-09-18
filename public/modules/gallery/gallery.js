(function () {
  var app = angular.module('gallery',[]);
  app.directive('gallery',function () {
    return {
      restrict : 'E',
      templateUrl : './modules/gallery/views/gallery.jade',
      scope : {pic : '='},
      controller : function ($scope) {
          
          var slideIndex = 1;
          $scope.lengthPage = function () {
            var count = 0;
            var i;
            for (i in $scope.pic) {
                if ($scope.pic.hasOwnProperty(i)) {
                    count++;
                }
            }
            return count;
          }

          $scope.plusSlides = function (n) {
                          $scope.showSlide(slideIndex += n);
                        }

          $scope.currentSlide = function (n) {
                              $scope.showSlide(slideIndex = n);
                            }

          $scope.showSlide = function (n) {
                          var i;
                          var slides = document.getElementsByClassName("mySlides");
                          var dots = document.getElementsByClassName("dot");
                          if (n > slides.length) {slideIndex = 1}
                          if (n < 1) {slideIndex = slides.length}
                          for (i = 0; i < slides.length; i++) {
                              slides[i].style.display = "none";
                          }
                          for (i = 0; i < dots.length; i++) {
                              dots[i].className = dots[i].className.replace(" active", "");
                          }
                          slides[slideIndex-1].style.display = "block";
                          dots[slideIndex-1].className += " active";
                        }
          angular.element(document).ready(function () {
              $scope.showSlide(slideIndex);
          });

    }
  }
  })
})()
