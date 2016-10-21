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
                product : ['$http','$stateParams','$rootScope','following',function ($http,$stateParams,$rootScope,following) {
                              return $http.get('/product/'+$stateParams.id)
                                .then(function (response) {
                                  var result = response.data;
                                  result.active = following.check(result.following,$rootScope.user);
                                  return result;
                              });
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
                    this.coverImg = product.coverImg.index;
                    console.log(this.picture,'this.coverImg');
                  }],
                  controllerAs: 'product'
                },

                'side': {
                  templateUrl: './modules/store/views/store-product-side.jade',
                  controller: ['product','$http','$stateParams','$scope','$rootScope','modalAuthService','following','$timeout',
                  function (product,$http,$stateParams,$scope,$rootScope,modalAuthService,following,$timeout) {
                    var that = this;
                    this._id = product._id
                    this.name = product.name;
                    this.description ='i m  hero.';
                    this.bidEnd = product.bidEnd;
                    this.bider = product.bider;
                    this.creator = product.creator;
                    this.active = product.active;

                    //following service
                    this.following = function (productId) {
                      if(!that.active){
                          if ($rootScope.user !== undefined || $rootScope.user) {
                            following.follow( productId , 'follow' )
                            .then(function (res) {
                              console.log(res,'active true');
                              that.active = true;
                              $rootScope.notification_virtual = res;
                              });
                          }else {
                            modalAuthService.open();
                          }
                      } else {
                        following.unFollow(productId , 'follow' )
                        .then(function (res) {
                          console.log(res,'active false');
                          that.active = false;
                          $rootScope.notification_virtual = res;
                        });
                      }
                    };

                    //countdown service
                    this.countdown = function () {
                      if(that.bidEnd>0){
                            that.bidEnd = that.bidEnd - 1000 ;
                            $scope.timeout =  $timeout(function () {
                                    that.countdown();
                            }, 1000);
                        } else {
                            $timeout.cancel($scope.timeout);
                        }
                    }

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
                                                  //check
                                                  that.active = true;
                                                  //notification offer
                                                  if ($rootScope.notification_getlist) {
                                                      if ( $rootScope.notification_getlist.indexOf(that._id) >= 0 ) {
                                                        socket.emit('join',that._id);
                                                        $rootScope.notification_getlist.push(that._id);
                                                      }
                                                    }
                                            }


                                            });
                                  }else {
                                          //service from main module
                                          //open login modal
                                          modalAuthService.open();
                                  }
                      }
                    };
                    /////initial app
                    this.countdown();
                    ////////web socket
                    var roomName = that._id;
                    //prevent join and leave room replace that user is following.
                    if ($rootScope.notification_getlist) {
                        if ( $rootScope.notification_getlist.indexOf(roomName) >= 0 ) {
                          roomName = null;
                        }
                      }

                    socket.emit('join',roomName);
                    socket.on('offer',function (offer) {
                      console.log(offer,'client offer');
                      that.bider.push(offer.data);
                    });
                    /////check follow when log-in
      var clearWatchUser = $rootScope.$watch('user',function (newValue, oldValue) {

                          if (newValue && !oldValue) {
                            that.active = following.check(product.following,newValue);
                          }
                      });

                    $scope.$on('$destroy', function (event) {
                      console.log('destroy');
                      clearWatchUser();

                        socket.removeListener('offer');
      
                      //socket.removeAllListeners();
                      socket.emit('leave',roomName);
                      $timeout.cancel($scope.timeout);
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
