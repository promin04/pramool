(function () {

  var app = angular.module('store');
  app.directive('store',function () {
    return {
      restrict: 'A',
      templateUrl : './modules/store/views/store.jade',
      controller : ['$http','$scope',function ($http,$scope) {
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

            $http.get('/product').then(function(response) {
              var data = response.data;
              that.product=that.product.concat(data);
              console.log(that.product);
            });


          this.test = function () {
            this.product.pop();
            console.log('serr');
          }
      ////////web socket
      socket.emit('leave','');
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
        console.log(offer,'store offer');
      });
      $scope.$on('$destroy', function (event) {
        socket.removeAllListeners();
      });

      }],
      controllerAs : 'store'
    };
  });



})();
