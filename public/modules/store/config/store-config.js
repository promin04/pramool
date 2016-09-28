(function () {
    angular.module('store',['timer','gallery','addProduct'])
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
                    this.picture = product.img.reduce(function(total, value, i) {
                          total[i] = value;
                          return total;
                    }, {});
                  }],
                  controllerAs: 'product'
                },

                'side': {
                  templateUrl: './modules/store/views/store-product-side.jade',
                  controller: ['product','$http','$stateParams','$scope','$rootScope','modalAuthService',
                  function (product,$http,$stateParams,$scope,$rootScope,modalAuthService) {
                    var that = this;
                    this._id = product._id
                    this.name = product.name;
                    this.description ='i m  hero.';
                    this.bidEnd = product.bidEnd;
                    this.bider = product.bider;

                    this.offer = function () {

                      if (typeof this.price == 'undefined' || this.price<=product.bider[product.bider.length-1].price) {
                          console.log($rootScope.user !== undefined,'error');

                          if($rootScope.user == undefined){
                            modalAuthService.open();
                          }
                      }else {

                                    if($rootScope.user !== undefined){
                                    
                                            $http.post('/product/'+$stateParams.id,{price : this.price}).then(function (response) {

                                            if(response.data.error){
                                                  //service from main module
                                                  //open login modal
                                                  modalAuthService.open();
                                            } else {
                                                  //pass data by socket io
                                                  socket.emit('offer',{
                                                    product_id: that._id,
                                                    data:response.data.bider,
                                                    name:response.data.name
                                                  });
                                            }


                                            });
                                  }else {
                                          //service from main module
                                          //open login modal
                                          modalAuthService.open();
                                  }
                      }
                    }

                    ////////web socket
                    socket.emit('leave','');
                    socket.emit('join',that._id);
                    socket.on('offer',function (offer) {
                      console.log(offer,'client offer');
                      that.bider.push(offer.data);
                    });
                    $scope.$on('$destroy', function (event) {
                      console.log('destroy');
                      socket.removeAllListeners();
                    });
                  }],
                  controllerAs: 'product'
                }
              }
            })
            //defer url when use state.current (prevent from empty value)
            $urlRouterProvider.deferIntercept();

      }
    ]);


})()
