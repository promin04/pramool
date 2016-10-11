(function () {
  var app = angular.module('gallery',[]);
  app.directive('gallery',function () {
    return {
      restrict : 'E',
      templateUrl : './modules/gallery/views/gallery.jade',
      scope : {pic : '=' , pointer : '@'},
      controller : ['$scope',function ($scope) {
        $scope.$watch('pic',function (newValue, oldValue) {

          if(newValue.length>1 && ( newValue !== oldValue )){
            angular.element(document).ready(function () {
              var slides = document.getElementsByClassName("mySlides");
              slides[newValue.length-1].style.display = "none";
            });

          }

        },true);

        $scope.$watch('pointer',function (newValue, oldValue) {
          if ( newValue !== oldValue ) {
              $scope.currentSlide(+newValue);
          }
        },true);
        console.log($scope.pointer,'mos');
          var slideIndex = $scope.pointer || 0;

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

                        angular.element(document).ready(function () {

                          var i;
                          var slides = document.getElementsByClassName("mySlides");
                          var dots = document.getElementsByClassName("dot");
                          if (n > slides.length-1) {slideIndex = 0}
                          if (n < 0) {slideIndex = slides.length-1}
                          for (i = 0; i < slides.length; i++) {

                              slides[i].style.display = "none";
                          }
                          for (i = 0; i < dots.length; i++) {
                              dots[i].className = dots[i].className.replace(" active", "");
                          }

                          slides[slideIndex].style.display = "block";

                          dots[slideIndex].className += " active";
                        });


                        }


        //app initial
              $scope.showSlide(slideIndex);


    }]
  }
  })
})()
