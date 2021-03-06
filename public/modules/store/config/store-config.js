(function () {
    angular.module('store')
      .config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {

          $stateProvider
          .state('404', {
              url: '/404',
              templateUrl:'./modules/store/views/404.jade'
          })
            .state('product',{
              abstract: true,

              templateUrl:'./modules/store/views/store-product.jade'
            })

            .state('product.detail',{
              url: '/product/:id',

              resolve: {
                product : ['$http','$stateParams','$rootScope','following','$state',function ($http,$stateParams,$rootScope,following,$state) {
                              return $http.get('/api/product/'+$stateParams.id)
                                .then(
                                  function (response) {
                                    var result = response.data;
                                    console.log('result',result);
                                    result.active = following.check(result.following,$rootScope.user);
                                    return result;
                                  } ,
                                  function (err) {
                                    $state.go('404');
                                    console.log(err,'error');
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


      }
    ]);


})()
