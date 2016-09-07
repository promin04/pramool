(function () {
    angular.module('store',['timer'])
      .config(['$stateProvider',function ($stateProvider) {
          $stateProvider
            .state('product',{
              abstract: true,
              templateUrl:'./modules/store/views/store-product.jade'
            })
            .state('product.detail',{
              url: '/product/:id',
              views: {
                'main': {
                  templateUrl: './modules/store/views/store-product-main.jade',
                  controller: function () {
                    this.name = 'mos';
                    this.description ='i m  hero.';
                  },
                  controllerAs: 'product'
                },
                'side': {
                  templateUrl: './modules/store/views/store-product-side.jade'
                }
              }
            })
      }])
})()
