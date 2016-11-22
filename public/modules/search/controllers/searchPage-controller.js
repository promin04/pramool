(function () {
  angular.module('search')
    .controller('searchPageController', ['$http','$timeout','$scope','search','$stateParams',function ($http,$timeout,$scope,search,$stateParams) {
      var that = this;

      this.product =  [];
      this.searchText = $stateParams.name;

      this.getSearch = function () {
            that.product = search.get( $stateParams.name ).then(
              function (res) {
                that.product = res.data;
                console.log(that.product);
              }
            );
      }

      //countdown servic

      this.countdown = function () {
        for(var i = 0 ; i < that.product.length ; i++){
          that.product[i].bidEnd = that.product[i].bidEnd - 1000 ;

        }
        $scope.timeout =  $timeout(function () {
                that.countdown();
        }, 1000);
      }
      //init completed page
      this.getSearch();
      this.countdown();
      ////////web socket
      socket.emit('join','store');
      socket.on('offer',function (offer) {
        var id;
        var result = [];
        var re = new RegExp(offer.product_id, 'i');
        for( var i = 0 ; i < that.product.length ; i++ ){
          id = that.product[i]._id;
          result = id.match(re);
          if(result){
            that.product[i].bider.push(offer.data);
            console.log('update completed',that.product[i]);
          }
        }

      });
      //set masonry layout
      $timeout(function () {

        $('.grid').masonry({
          itemSelector: '.grid-item',
          columnWidth: 20
        });
      }, 100);

      $scope.$on('$destroy', function (event) {
        console.log('destroy');


          //socket.removeAllListeners();
          socket.removeListener('offer');
          socket.emit('leave','store');

         $timeout.cancel($scope.timeout);
      });

    }]
    );
})()
