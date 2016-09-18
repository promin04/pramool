(function () {
  angular.module('addProduct')
    .directive('addProduct',function () {
    return  {
        restrict: 'A',

        templateUrl : './modules/addProduct/views/addProduct.jade',

        controller : ['$http','imgur','$state',function ($http,imgur,$state) {
                var that = this;
                this.picFile = null;
                this.state = null;
                this.picture = [];
                this.processBar = 0;
                this.picRemove = function (index) {
                  this.picture.splice(index,1);
                }
                this.prepare = function (files) {
                  console.log(files);
                      if(Array.isArray(files) && files.length<5-this.picture.length){
                        this.picture = this.picture.concat(files);
                      } else {
                        this.state = 1; //show error gallery image
                      }
                };
                this.add = function () {
                    this.state = 10; //show complete bar&hide submit button
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

                    var processBar = function (complete,total) {
                      that.processBar = complete/total*100;
                    }
                      imgur.post(that.picture,processBar,createPro);


                };


      }],
      controllerAs : 'product'
      };
    })
})()
