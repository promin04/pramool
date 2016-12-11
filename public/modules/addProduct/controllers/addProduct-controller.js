(function () {
  angular.module( 'addProduct' )
    .controller( 'addProductController' , ['$http','imgur','$state','$timeout','$scope','$stateParams','imgManager',
    function ( $http , imgur , $state , $timeout , $scope , $stateParams , imgManager) {

            var that = this;
            var imgWidth;
            var imgHeight;
            var order = 1;
            var clear_setInterval;
            this.editMode = false;
            this.state = null;
            this.picture = [];
            this.oldPic = [];
            this.pointer = 0; //position of array picture that is a cover image.
            this.processBar = 0;
            this.classImg = true ;
            imgManager.set( that.picture , that.picture , that.pointer);

            //check resolve from editMode
            if ( $scope.resolve ) {

            clear_setInterval = setInterval(
                      function(){
                        if ( $scope.product.input.name.length === 0 ) {
                          console.log('ss');
                          $timeout(function () {
                            console.log('$scope.resolve',$scope.resolve);
                            //set value and type depend on input to evoid ng-model type error
                            that.editMode = true;
                            $scope.product.input.name = $scope.resolve.name.toString();
                            $scope.product.input.price = +$scope.resolve.price;
                            that.picture = angular.copy( $scope.resolve.picture );
                            that.oldPic = angular.copy( $scope.resolve.picture );
                            that.pointer = +$scope.resolve.pointer;
                            $scope.product.input.description.detail = $scope.resolve.description.detail.toString();
                            $scope.product.input.description.size = {};
                            $scope.product.input.description.size.width = +$scope.resolve.description.size.width;
                            $scope.product.input.description.size.long =  +$scope.resolve.description.size.long;
                            $scope.product.input.description.size.height = +$scope.resolve.description.size.height;
                            $scope.product.input.description.weight = +$scope.resolve.description.weight;
                            $scope.product.input.description.condition = $scope.resolve.description.condition;
                            imgManager.set( that.picture , that.picture , that.pointer);
                          }, 100);
                        }else {
                          console.log('clear');
                          clearTimeout(clear_setInterval);

                        }


                     }, 1000);


            }

            this.changeClass = function () {

              if (this.picture[this.pointer]) {
                if (this.picture[this.pointer].autoH >= this.picture[this.pointer].autoW) {
                   this.classImg = true;
                } else {
                   this.classImg = false;
                }

              }
            }


            this.picRemove = function (index) {
                var data = imgManager.picRemove(index);
                this.picture = data.picture;
                this.pointer = data.pointer;
                console.log(this.pointer,'point');
                this.changeClass();
            }

            this.prepare = function (files) {
             imgManager.prepare(files).then(function (res) {
                that.picture = res.picture;
              });
            };

            this.add = function () {
                this.state = 10; //show complete bar&hide submit button
                var product_obj = {
                  name : $scope.product.input.name ,
                  time : $scope.product.input.time ,
                  description : $scope.product.input.description , //all description such as W H L
                  img : [] ,
                  coverImg : that.pointer ,
                  price : $scope.product.input.price
                };
                var data ={};

                var createPro = function (array_add,file,array_remain) {
                  console.log(array_add,file,array_remain,'all');
                  product_obj.img = product_obj.img.concat( array_remain );

                  for(var i = 0 ; i<array_add.length ; i++){
                      data = {
                          link: array_add[i].link,
                          deletehash: array_add[i].deletehash,
                          width: file[i].width,
                          height: file[i].height
                      };
                      //add images to product object
                      product_obj.img.push(data);
                  }

                  if (!that.editMode) {
                    console.log('createMode');
                    return  $http.post('/api/product', product_obj )
                              .then(
                                function (res) {
                                  $state.go('auction');
                                  return;
                              });
                  }else {
                    console.log('editMode');
                    return  $http.post(`/api/edit/${$stateParams.id}`, product_obj )
                              .then(
                                function (res) {
                                  $state.go('dashboard.myProduct');
                                  return;
                              });
                  }

                }

                var processBar = function (complete,total) {
                  that.processBar = complete/total*100;
                }

                    //imgManager API

                      imgManager.combine( that.oldPic , that.picture)
                        .then(
                          function (res) {
                            createPro( res.arrayData , res.file , res.array_remain );
                          }
                        );


            };

            this.setCover = function (index) {
              this.pointer = index;
              imgManager.setPointer(index);
              this.changeClass();
            }

            this.preview = function () {
              $state.go('^.preview');
            }

            this.previewBack = function () {
              $state.go('^.form');
            }

            $scope.$on('$destroy', function (event) {
              console.log('destroy');
                clearTimeout(clear_setInterval);
                $( window ).off('resize');
                $(".short-description").off('keyup');
            });


  }]
 );
})()
