(function () {
  var app = angular.module('store',[]);
  app.directive('store',function () {
    return {
      restrict: 'E',
      templateUrl : './modules/store/views/store.jade'
    };
  });
  app.controller('StoreController',function () {
    this.product =  [
      {
        name: 'Computer',
        price: '10,000',
        description: 'all full-spec. Ram 8G core i5.',
        time: '14:54:00'
      },{
        name: 'Coffee',
        price: '40',
        description: 'mocha coffee.',
        time: '00:12:11'
      },{
        name: 'Toy',
        price: '9,999',
        description: 'new product from sony.',
        time: '55:54:22'
      }
    ];
    

  })
})();
