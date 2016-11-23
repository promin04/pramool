(function () {
  angular.module('dashboard',['timer'])
    .config(['$stateProvider',function ($stateProvider) {
      $stateProvider
        .state('dashboard',{
          url:'/dashboard',
          abstract: true,
          templateUrl:'./modules/dashboard/views/dashboard.jade',
          resolve:{
            following:['followed',function (followed) {
                        var result = followed.product();

                        console.log(result,'followed.product()');

                 return result;
            }]
          }
        })
          .state('dashboard.myProduct',{
            url:'/my-product',
            views:{
              myProduct:{
                templateUrl:'./modules/dashboard/views/myProduct0.jade',
                controller:['following','$timeout','deleteProduct','$rootScope','$scope',function (following,$timeout,deleteProduct,$rootScope,$scope) {
                  console.log(following,'followed');
                  var that = this;
                  this.product = following.myProduct;
                  console.log(this.product,'myProduct');

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
                  //clear all
                  $scope.$on('$destroy', function (event) {
                    console.log('destroy');
                    socket.removeAllListeners();
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
              }
            }
          })
          .state('dashboard.following',{
            url:'/following',
            views:{
              following:{
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
                  //clear all
                  $scope.$on('$destroy', function (event) {
                    console.log('destroy');
                    socket.removeAllListeners();
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
              }
            }
          })

    }])
})()
