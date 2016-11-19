(function () {
  angular.module('addProduct')
    .directive('addProduct',function () {
      var link = function (scope , element , attr , ctrl) {
        var el_container = $('.add-product-container');
        var el1 = $('.add-product-slide-1');
        var el2 = $('.add-product-slide-2');
        var slide = 1 ;

        ctrl.preview = function () {
          slide = 2 ;
          var hi = el2.height() + 100;
          el_container.height(hi);
          el1.css({"right": "-100%"});
          el2.css({"right": "0px"});
        }

        ctrl.previewBack = function () {
          slide = 1 ;
          var hi = el1.height();
          el_container.height(hi);
          el1.css({"right": "0"});
          el2.css({"right": "100%"});
        }

          $(".short-description").keyup(function(event){
            if(event.keyCode == 13){
              var hi = el1.height();
              el_container.height(hi);
            }
          });

          $( window ).resize(function() {
            if (slide === 1) {
              var hi = el1.height();
              el_container.height(hi);
            }
            else if (slide === 2) {
              var hi = el2.height() + 100;
              el_container.height(hi);
            }
          });

      }
    return  {
        restrict: 'A',
        templateUrl : './modules/addProduct/views/addProduct.jade',
        controller : 'addProductController',
        controllerAs : 'product',
        link : link
      };
    })
})()
