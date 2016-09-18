(function () {

  var app = angular.module('store');
  app.directive('store',function () {
    return {
      restrict: 'A',
      templateUrl : './modules/store/views/store.jade',
      controller : ['$http',function ($http) {
        var that = this;

      this.delete = function () {
        var count = 0;
        for (var i = 0; i < that.product[0].img.length; i++) {


        $http.delete('https://api.imgur.com/3/image/'+that.product[0].img[i].deletehash,
        {
            headers: {
              Authorization: 'Client-ID 18f8382f95b805f',
            }
        }
      ).then(function (response) {
          count++;
          console.log('already done '+count);
          if(count === that.product[0].img.length){
            $http.delete('/product');
          }

        });
      }

    };

      this.product = [];

            $http.get('/product').then(function(response) {
              var data = response.data;
              that.product=that.product.concat(data);
              console.log(that.product);
            });
    
      socket.emit('leave','');
      }],
      controllerAs : 'store'
    };
  });



})();
