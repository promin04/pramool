(function () {
    angular.module('store',['timer','gallery'])
      .config(['$stateProvider',function ($stateProvider) {

          $stateProvider

            .state('product',{
              abstract: true,

              templateUrl:'./modules/store/views/store-product.jade'
            })

            .state('product.detail',{
              url: '/product/:id',

              resolve: {
                product : ['$http','$stateParams',function ($http,$stateParams) {
                              return $http.get('/product/'+$stateParams.id)
                                .then(function (response) {
                                    return response.data;
                                })
                          }]
              },
              views: {

                'main': {
                  templateUrl: './modules/store/views/store-product-main.jade',
                  controller: ['product',function (product) {
                    this.name = product.name;
                    this.description ='i m  hero.';
                  }],
                  controllerAs: 'product'
                },

                'side': {
                  templateUrl: './modules/store/views/store-product-side.jade',
                  controller: ['product','$http','$stateParams','$scope',
                  function (product,$http,$stateParams,$scope) {
                    var that = this;
                    this.bidEnd = product.bidEnd;
                    this.bider = product.bider;
                    this.offer = function () {

                      if (typeof this.price == 'undefined' || this.price<product.bider[product.bider.length-1].price) {
                          console.log('error');

                      }else {
                        $http.post('/product/'+$stateParams.id,{price : this.price}).then(function (response) {
                            that.bider = response.data.bider
                        })
                      }
                    }
                  }],
                  controllerAs: 'product'
                }
              }
            })
      }])
})()
