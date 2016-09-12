(function () {

  var app = angular.module('store');
  app.directive('store',function () {
    return {
      restrict: 'A',
      templateUrl : './modules/store/views/store.jade',
      controller : ['$http',function ($http) {
        var that = this;

        this.add = function () {
      
          $http.post('/product',this.stuff);
      };

      this.delete = function () {
        $http.delete('/product');
    };

        this.product =  [];

            $http.get('/product').then(function(response) {
              var data = response.data;
              that.product=that.product.concat(data);

            });
      }],
      controllerAs : 'store'
    };
  });


})();
