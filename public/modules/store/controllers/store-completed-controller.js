(function () {
  angular.module('store')
    .controller('storeCompleteController' , ['$http','$timeout','$scope',function ($http,$timeout,$scope) {
      var that = this;

      this.product =  [];


      this.getComplete = function () {
          $http.get('/completed').then(function(response){
            var data = response.data;
            that.product = data
            console.log(that.product);
          });
      }
      //countdown service
      this.countdown = function () {
        for(var i = 0 ; i < that.product.length ; i++){
          that.product[i].bidEnd = that.product[i].bidEnd - 1000 ;

        }
        $scope.timeout =  $timeout(function () {
                that.countdown();
        }, 1000);
      }
      //init completed page
      this.getComplete();
      this.countdown();
      //set masonry layout
      $timeout(function () {

        $('.grid').masonry({
          itemSelector: '.grid-item',
          columnWidth: 20
        });
      }, 100);

      $scope.$on('$destroy', function (event) {
        console.log('destroy');
         $timeout.cancel($scope.timeout);
      });
    }]
  );
})()
