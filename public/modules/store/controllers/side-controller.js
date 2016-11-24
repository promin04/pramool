(function () {
  angular.module('store')
    .controller('sideController' , ['product','$http','$stateParams','$scope','$rootScope','modalAuthService','following','$timeout',
    function (product,$http,$stateParams,$scope,$rootScope,modalAuthService,following,$timeout) {
      var that = this;
      this._id = product._id ;
      this.name = product.name;
      this.bidEnd = product.bidEnd;
      this.bider = product.bider;
      this.creator = product.creator;
      this.active = product.active;
      this.description = product.description;
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
                              console.log('offer',$rootScope.user);
                              $http.post('/product/'+$stateParams.id,{price : this.price}).then(function (response) {

                              if(response.data.error){
                                    //service from main module
                                    //open login modal
                                    modalAuthService.open();
                              } else {
                                    that.price = '';
                                    that.active = true; //for active follow buttom
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


      socket.emit('join',roomName);
      socket.on('offer',function (offer) {
        console.log(offer,'client offer');
        that.bider.push(offer.data);
        that.bidEnd = offer.bidEnd;

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
    }]);
})()
