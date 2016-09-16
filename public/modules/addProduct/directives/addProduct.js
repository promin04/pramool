(function () {
  angular.module('addProduct')
    .directive('addProduct',function () {
    return  {
        restrict: 'A',

        templateUrl : './modules/addProduct/views/addProduct.jade',

        controller : ['$http','imgur','$state',function ($http,imgur,$state) {
                var that = this;
                this.picFile = null;
                this.error = null;
                this.picture = [];

                this.prepare = function (files) {
                  if(Array.isArray(files) && files.length<5-this.picture.length){
                    this.picture = this.picture.concat(files);
                  } else {
                    this.error = 1;
                  }

                };
                this.add = function () {
                    var pro = this.stuff;
                    var data ={}
                    pro.img = [];
                    var createPro = function (arrayData) {
                      for(var i = 0 ; i<arrayData.length ; i++){
                          data = {
                              link: arrayData[i].link,
                              deletehash: arrayData[i].deletehash,
                              order: arrayData[i].title
                          };
                          pro.img.push(data);
                      }

                    $http.post('/product',pro).then(function (res) {
                      $state.go('auction');
                    });
                    }

                      imgur.post(that.picture,createPro);


                };


      }],
      controllerAs : 'product'
      };
    })
})()
