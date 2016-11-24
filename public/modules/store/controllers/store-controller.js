(function () {
  angular.module('store')
    .controller('storeController' , ['$http','$scope','$timeout',function ($http,$scope,$timeout) {

      var that = this;

    this.product = [];

    this.getNew = function () {
      $http.get('/product').then(function(response) {
        var data = response.data;
        that.product = data;
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

    ///initial app
        this.getNew();
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
          that.product[i].bidEnd = offer.bidEnd;
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
