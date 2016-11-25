(function () {
  angular.module('gallery')
    .controller('galleryController', ['$scope',function ($scope) {
        var slides = $scope.pic;
        $scope.$watch('pic',function (newValue, oldValue) {
            if (newValue.length === 1 && oldValue.length === 0) {
              $scope.currentSlide($scope.pointer); //bug at start
            }
          //disappear new image was added in gallery for showing cover image
          if(newValue.length > oldValue.length && newValue.length>1){
            angular.element(document).ready(function () {
              slides = document.getElementsByClassName("mySlides");
              slides[newValue.length-1].style.display = "none";
            });
          }

        },true);

        $scope.$watch('pointer',function (newValue, oldValue) {


          if ( (newValue !== oldValue) ) {
              $scope.currentSlide(newValue);
          }
        },true);


          var slideIndex = $scope.pointer ;
          console.log('slideIndex',slideIndex);
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
                              console.log(n,'n');
                              $scope.showSlide(slideIndex = n);
                            }

          $scope.showSlide = function (n) {


                        if($scope.pic.length === 0){return;}
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
                              dots[i].className = dots[i].className.replace("active", "");
                          }

                          slides[slideIndex].style.display = "block";

                          dots[slideIndex].className = "dot active";
                        });


                        }


        //app initial
              $scope.showSlide(slideIndex);


    }]
  )
})()
