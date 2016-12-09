(function () {
  angular.module('dashboard')
    .config(['$stateProvider',function ($stateProvider) {
      $stateProvider
        .state('dashboard',{
          url:'/dashboard',
          abstract: true,
          templateUrl:'./modules/dashboard/views/dashboard.jade',
          resolve:{
            following:['followed',function (followed) {
                        var result = followed.product();
                 return result;
            }]
          }

        })
          .state('dashboard.myProduct',{
            url:'',
            templateUrl:'./modules/dashboard/views/myProduct0.jade',
            controller:['following','$timeout','deleteProduct','$rootScope','$scope',function (following,$timeout,deleteProduct,$rootScope,$scope) {

              var that = this;
              this.product = following.myProduct;

              this.removeProduct = function ( _id , img , index ) {
                deleteProduct.delete( _id , img )
                  .then(function ( response ) {
                        that.product.splice( index , 1 );
                    }
                  );
              }

              //countdown service
              this.countdown = function () {
                for(var i = 0 ; i < that.product.length ; i++){
                  that.product[i].bidEnd = that.product[i].bidEnd - 1000 ;

                }
                $scope.timeout =  $timeout(function () {
                        that.countdown();
                }, 1000);
              }
              //initial app
              this.countdown();
              ////////web socket
              socket.emit('join','store');
              socket.on('offer',function (offer) {
                var id;
                var result = [];
                var re = new RegExp(offer.product_id, 'i');
                for( var i = 0 ; i < that.product.length ; i++ ){
                  id = that.product[i]._id;
                  result = id.match(re);
                  if(result){
                    that.product[i].bider.push(offer.data);
                    that.product[i].bidEnd = offer.bidEnd;
                    console.log('update completed',that.product[i]);
                  }
                }

              });
              //clear all
              $scope.$on('$destroy', function (event) {
                console.log('destroy');
                //socket.removeAllListeners();
                socket.removeListener('offer');
                socket.emit('leave','store');
                $timeout.cancel($scope.timeout);
              });
              //set masonry layout
              $timeout(function () {

                $('.grid').masonry({
                  itemSelector: '.grid-item',
                  columnWidth: 20
                });
              }, 100);

            }],
            controllerAs:'store'


          })
          .state('dashboard.following',{
            url: "/following",
            templateUrl:'./modules/dashboard/views/following0.jade',
            controller:['following','$timeout','$rootScope','$scope',function ( following , $timeout , $rootScope, $scope ) {
              var that = this;

              this.product =   following.myFollow;
              console.log(this.product,'following');


              //countdown service
              this.countdown = function () {
                for(var i = 0 ; i < that.product.length ; i++){
                  that.product[i].bidEnd = that.product[i].bidEnd - 1000 ;

                }
                $scope.timeout =  $timeout(function () {
                        that.countdown();
                }, 1000);
              }
              //initial app
              this.countdown();
              ////////web socket
              socket.emit('join','store');
              socket.on('offer',function (offer) {
                var id;
                var result = [];
                var re = new RegExp(offer.product_id, 'i');
                for( var i = 0 ; i < that.product.length ; i++ ){
                  id = that.product[i]._id;
                  result = id.match(re);
                  if(result){
                    that.product[i].bider.push(offer.data);
                    that.product[i].bidEnd = offer.bidEnd;
                    console.log('update completed',that.product[i]);
                  }
                }

              });
              //clear all
              $scope.$on('$destroy', function (event) {
                console.log('destroy');
                //socket.removeAllListeners();
                socket.removeListener('offer');
                socket.emit('leave','store');
                $timeout.cancel($scope.timeout);
              });
              //set masonry layout
              $timeout(function () {

                $('.grid').masonry({
                  itemSelector: '.grid-item',
                  columnWidth: 20
                });
              }, 100);

            }],
            controllerAs:'store'

          })

    }])
})()
