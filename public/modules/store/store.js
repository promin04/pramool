(function () {

  var app = angular.module('store');
  app.directive('store',function () {
    return {
      restrict: 'A',
      templateUrl : './modules/store/views/store.jade',
      controller : ['$http','$scope','$timeout',function ($http,$scope,$timeout) {

        var that = this;

      this.delete = function () {
        for(var j = 0; j < that.product.length ; j++){
        var count = 0;
        for (var i = 0; i < that.product[j].img.length; i++) {


        $http.delete('https://api.imgur.com/3/image/'+that.product[0].img[i].deletehash,
        {
            headers: {
              Authorization: 'Client-ID 18f8382f95b805f',
            }
        }
      ).then(function (response) {
          count++;
          console.log('already done '+j+' // '+count);
          if(count === that.product[0].img.length){
            $http.delete('/product');
          }

        });
      }
      }
    };

      this.product = [];

      this.getNew = function () {
        $http.get('/product').then(function(response) {
          var data = response.data;
          that.product = data;
          console.log(that.product);
        });
      }

      this.test = function () {
        this.product.pop();
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
            console.log('update completed',that.product[i]);
          }
        }

      });
      $scope.$on('$destroy', function (event) {
        console.log('destroy');

          socket.removeListener('offer');

        //socket.removeAllListeners();
        socket.emit('leave','store');
        $timeout.cancel($scope.timeout);

      });
      ///////

      //set masonry layout
      $timeout(function () {

        $('.grid').masonry({
          itemSelector: '.grid-item',
          columnWidth: 20
        });
      }, 100);
      ///////
      }],
      controllerAs : 'store'
    };
  });



})();
