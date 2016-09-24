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
                  controller: ['product','$http','$stateParams','$scope','modalAuthService',
                  function (product,$http,$stateParams,$scope,modalAuthService) {
                    var that = this;
                    this._id = product._id
                    this.name = product.name;
                    this.description ='i m  hero.';
                    this.bidEnd = product.bidEnd;
                    this.bider = product.bider;

                    this.offer = function () {

                      if (typeof this.price == 'undefined' || this.price<=product.bider[product.bider.length-1].price) {
                          console.log(window.user !== undefined,'error');

                          if(window.user == undefined){
                            modalAuthService.open();
                          }
                      }else {

                                    if(window.user !== undefined){
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
                    socket.emit('join',that.name);
                    socket.on('offer',function (offer) {
                      console.log(offer,'client offer');
                      that.bider.push(offer.data);
                    });
                    $scope.$on('$destroy', function (event) {
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
    ])
    .run([
      '$rootScope','$state','modalAuthService','$http','userService','$urlRouter',
      function ($rootScope,$state,modalAuthService,$http,userService,$urlRouter) {
        $rootScope.$on('$stateChangeStart',function (event, toState, toParams, fromState, fromParams) {
          var closed = function () {
          if($rootScope.user == undefined)
            $state.go('auction');
          }

          if ($rootScope.user == undefined) {

              userService.getUser()
              .then(
                //resolve can get username
                function (res) {
                  console.log(res,'nice');
                },
                //reject unlog-in username=null
                function (reject) {
                  console.log(reject);
                    //check state
                    if(toState.name === 'newProduct'){
                        modalAuthService.open(closed);
                    }
                }
              );

        }

      });

      $rootScope.$watch('user',function (newValue, oldValue) {
        //defer state.current url (have to use $urlRouterProvider.deferIntercept() in config before)
        $urlRouter.sync();
        console.log($state.current.name,'stat current');
        if(($state.current.name !== 'auction') && !newValue && oldValue){
          modalAuthService.open(closed);
        }
        //close defer state.current url (have to use $urlRouterProvider.deferIntercept() in config before)
        $urlRouter.listen();
      });

      }
    ]);

})()
