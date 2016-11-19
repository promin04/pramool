(function () {
    angular.module('store',['timer','gallery','addProduct','comment','ngSanitize'])
      .config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {

          $stateProvider
          .state('newProduct', {
              url: '/new-product',
              template: '<div add-product class="add-product"></div>' //or templateUrl: 'someFile.html'
          })

            .state('product',{
              abstract: true,

              templateUrl:'./modules/store/views/store-product.jade'
            })

            .state('product.detail',{
              url: '/product/:id',

              resolve: {
                product : ['$http','$stateParams','$rootScope','following',function ($http,$stateParams,$rootScope,following) {
                              return $http.get('/product/'+$stateParams.id)
                                .then(function (response) {
                                  var result = response.data;
                                  console.log('result',result);
                                  result.active = following.check(result.following,$rootScope.user);
                                  return result;
                              });
                          }]
              },
              views: {

                'main': {
                  templateUrl: './modules/store/views/store-product-main.jade',
                  controller: 'mainController',
                  controllerAs: 'product'
                },

                'side': {
                  templateUrl: './modules/store/views/store-product-side.jade',
                  controller: 'sideController',
                  controllerAs: 'product'
                },

                'comment': {
                  templateUrl: './modules/store/views/store-product-comment.jade',
                  controller: 'bottomController',
                  controllerAs: 'product'
                },
              }
            });
            //defer url when use state.current (prevent from empty value)
            $urlRouterProvider.deferIntercept();

      }
    ]);


})()
