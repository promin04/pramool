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
                console.log(myProduct.product(),'resolve mypro');
                 return myProduct.product();
            }],
            following:['followed',function (followed) {
                console.log(followed.product(),'resolve followed');
                 return followed.product();
            }]
          }
        })
          .state('dashboard.myProduct',{
            url:'/my-product',
            views:{
              myProduct:{
                templateUrl:'./modules/dashboard/views/myProduct.jade',
                controller:['maProduct','$timeout',function (maProduct,$timeout) {
                  this.product = maProduct.data;
                  console.log(this.product,'myProduct');
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
