(function () {
  var app = angular.module('store');
  app.directive('storeCompleted',function () {
    return {
      restrict: 'A',
      templateUrl : './modules/store/views/store-completed.jade',
      controller : ['$http',function ($http) {
        var that = this;

        this.product =  [];

            $http.get('/completed').then(function(response){
              var data = response.data;
              that.product=that.product.concat(data);
              console.log(that.product);
            });



    
      }],
      controllerAs : 'store'
    };

  });
})()
