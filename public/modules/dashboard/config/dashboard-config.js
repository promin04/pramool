(function () {
  angular.module('dashboard',[])
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
                controller:['following','$timeout','deleteProduct','$rootScope',function (following,$timeout,deleteProduct,$rootScope) {
                  var that = this;
                  this.product = following.data.filter(function (each) {
                    return each.creator === $rootScope.user
                  });
                  console.log(this.product,'myProduct');

                  this.removeProduct = function ( _id , img , index ) {
                    deleteProduct.delete( _id , img )
                      .then(function ( response ) {
                            that.product.splice( index , 1 );
                            console.log( 'splice' );
                        }
                      );
                  }


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
                controller:['following','$timeout','$rootScope',function ( following , $timeout , $rootScope ) {
                  this.product =  following.data.filter(function (each) {
                    return each.creator !== $rootScope.user
                  });
                  console.log(this.product,'following');
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
