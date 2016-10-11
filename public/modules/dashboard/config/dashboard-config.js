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

                 return followed.product();
            }]
          }
        })
          .state('dashboard.myProduct',{
            url:'/my-product',
            views:{
              myProduct:{
                templateUrl:'./modules/dashboard/views/myProduct.jade',
                controller:['following','$timeout','deleteProduct','$rootScope','$scope',function (following,$timeout,deleteProduct,$rootScope,$scope) {
                  var that = this;
                  this.product = following.data.filter(function (each) {
                    return each.creator === $rootScope.user
                  });
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
                      columnWidth: 224
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
                templateUrl:'./modules/dashboard/views/following.jade',
                controller:['following','$timeout','$rootScope','$scope',function ( following , $timeout , $rootScope, $scope ) {
                  var that = this;

                  this.product =  following.data.filter(function (each) {
                    return each.creator !== $rootScope.user
                  });
                  console.log(this.product,'following');

                  this.subscribe = this.product.filter(function (each) {

                    for( var i=0 ; i<each.following.length ; i++ ){

                      if (each.following[i].username === $rootScope.user) {
                        return 1;
                      }else if (i === each.following.length-1) {
                        return 0;
                      }
                    }

                  });
                  console.log(this.subscribe,'subscribe');
                  this.wereBid = this.product.filter(function (each) {

                    for( var i=0 ; i<each.bider.length ; i++ ){
                      console.log(each.bider[i].name);
                      if (each.bider[i].name === $rootScope.user) {
                        console.log('111');
                        return 1;
                      }else if (i === each.bider.length-1) {
                        return 0;
                      }

                    }

                  });
                  console.log(this.wereBid,'wereBid');

                  //countdown service
                  this.countdown = function () {
                    console.log('2');
                    if(that.subscribe.length>0){
                      for(var i = 0 ; i < that.subscribe.length ; i++){
                        that.subscribe[i].bidEnd = that.subscribe[i].bidEnd - 1000 ;
                      }
                    }
                    if(that.wereBid.length>0){
                      for(var i = 0 ; i < that.wereBid.length ; i++){
                        that.wereBid[i].bidEnd = that.wereBid[i].bidEnd - 1000 ;
                      }
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
                      columnWidth: 224
                    });
                  }, 100);

                }],
                controllerAs:'store'
              }
            }
          })

    }])
})()
