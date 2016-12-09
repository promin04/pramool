(function () {
    angular.module('editProduct')
      .config(['$stateProvider',function ($stateProvider) {

          $stateProvider
            .state('edit', {
                url: '/edit/:id',
                abstract: true,
                template: '<div add-product resolve="data"></div>',
                resolve: {
                  product : ['$http' , '$stateParams' , function ($http,$stateParams) {
                    return $http.get(`/api/edit/${$stateParams.id}`)
                                .then(
                                  function (res) {
                                    console.log(res,'res');
                                    var result = {
                                      name: res.data.name,
                                      description: res.data.description,
                                      price: res.data.bider[0].price,
                                      picture: res.data.img,
                                      pointer: res.data.coverImg.index
                                    };
                                    return result;
                                  }
                                );
                  }]
                },
                controller:['$scope' , 'product' , function ($scope , product) {
                  console.log(product,'product');
                  $scope.data = product;
                }]

            })
            .state('edit.form', {
                url: '',
                template: '<div form-product ></div>',


            })
            .state('edit.preview', {
                url: '/preview',
                template: '<div preview-product ></div>'
            })


      }
    ]);


})()
