(function () {
  var app = angular.module('gallery',[]);
  app.directive('gallery',function () {
    return {
      restrict : 'E',
      templateUrl : './modules/gallery/views/gallery.jade',
      scope : {pic : '=' , pointer : '='},
      controller : ['$scope',function ($scope) {
        var slides = [];
        $scope.$watch('pic',function (newValue, oldValue) {
          //disappear new image was added in gallery for showing cover image
          if(newValue.length>oldValue.length && newValue.length>1){
            console.log('1',$scope.pointer);
            angular.element(document).ready(function () {
               slides = document.getElementsByClassName("mySlides");
              slides[newValue.length-1].style.display = "none";
            });
          }
          //auto select cover image same position when cover image was removed
          else if (newValue.length<oldValue.length && newValue.length>0 && newValue.length>$scope.pointer) {
            console.log('2',$scope.pointer);
            $scope.currentSlide($scope.pointer);
          } else if (newValue.length<oldValue.length && newValue.length>0) {

            //$scope.pointer -= 1;
            console.log('3',$scope.pointer);
            $scope.currentSlide($scope.pointer);
          }
        },true);

        $scope.$watch('pointer',function (newValue, oldValue) {
          if ( (newValue !== oldValue) ) {
              $scope.currentSlide(+newValue);
          }
        },true);


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
                        if(slides[0]){
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

                        }


        //app initial
              $scope.showSlide(slideIndex);


    }]
  }
  })
})()
