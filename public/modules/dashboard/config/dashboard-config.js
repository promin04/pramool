(function () {
  angular.module('dashboard',[])
    .config(['$stateProvider',function ($stateProvider) {
      $stateProvider
        .state('dashboard',{
          url:'/dashboard',
          abstract: true,
          templateUrl:'./modules/dashboard/views/dashboard.jade',
          resolve:{
            maProduct:['myProduct',function (myProduct) {

                 return myProduct.product();
            }],
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
                controller:['maProduct','$timeout','deleteProduct',function (maProduct,$timeout,deleteProduct) {
                  var that = this;
                  this.product = maProduct.data;
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
                controller:['following','$timeout',function (following,$timeout) {
                  this.product = following.data;
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
