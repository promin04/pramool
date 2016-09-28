(function () {
  var app = angular.module('store');
  app.directive('storeCompleted',function () {
    return {
      restrict: 'A',
      templateUrl : './modules/store/views/store-completed.jade',
      controller : ['$http','$timeout',function ($http,$timeout) {
        var that = this;

        this.product =  [];


        this.getComplete = function () {
            $http.get('/completed').then(function(response){
              var data = response.data;
              that.product = data
              console.log(that.product);
            });
        }
        //set masonry layout
        $timeout(function () {

          $('.grid').masonry({
            itemSelector: '.grid-item',
            columnWidth: 204
          });
        }, 100);

        //init completed page
        this.getComplete();


      }],
      controllerAs : 'store'
    };

  });
})()
