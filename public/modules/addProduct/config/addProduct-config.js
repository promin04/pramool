(function () {
    angular.module('addProduct')
      .config(['$stateProvider',function ($stateProvider) {

          $stateProvider
            .state('newProduct', {
                url: '/new-product',
                abstract: true,
                template: '<div add-product ></div>'
            })
            .state('newProduct.form', {
              url:'',
                template: '<div form-product ></div>'
            })
            .state('newProduct.preview', {
                url:'preview',
                template: '<div preview-product ></div>'
            });


      }
    ]);


})()
