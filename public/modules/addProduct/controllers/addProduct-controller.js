(function () {
  angular.module( 'addProduct' )
    .controller( 'addProductController' , ['$http','imgur','$state','$timeout','$scope','$stateParams',
    function ( $http , imgur , $state , $timeout , $scope , $stateParams ) {

            var that = this;
            var imgWidth;
            var imgHeight;
            var order = 1;
            this.editMode = false;
            this.state = null;
            this.picture = [];
            this.pointer = 0; //position of array picture that is a cover image.
            this.processBar = 0;
            this.classImg = true ;

            //check resolve from editMode

            if ( $scope.resolve ) {
              $timeout(function () {
                console.log('work',this.picture , $scope.resolve.picture);
                //set value and type depend on input to evoid ng-model type error
                that.editMode = true;
                $scope.product.input.name = $scope.resolve.name.toString();
                $scope.product.input.price = +$scope.resolve.price;
                that.picture = $scope.resolve.picture;
                that.pointer = +$scope.resolve.pointer;
                $scope.product.input.description.detail = $scope.resolve.description.detail.toString();
                $scope.product.input.description.size = {};
                $scope.product.input.description.size.width = +$scope.resolve.description.size.width;
                $scope.product.input.description.size.long =  +$scope.resolve.description.size.long;
                $scope.product.input.description.size.height = +$scope.resolve.description.size.height;
                $scope.product.input.description.weight = +$scope.resolve.description.weight;
                $scope.product.input.description.condition = $scope.resolve.description.condition;
              }, 100);
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

              this.picture.splice(index,1);
              if(index < this.pointer){
                this.pointer -= 1;
              } else if (index === this.pointer && !this.picture[index+1] && this.picture[index-1]) {
                  this.pointer -= 1;
                }

              console.log(this.pointer,'point');
              this.changeClass();
            }

            this.prepare = function (files) {
                  console.log(files,'files');
                  var sortArray = [];
                  if(Array.isArray(files) && files.length<5-this.picture.length){
                    for(var i = 0 ; i < files.length ; i++){

                    //freeze i for each loop
                    (function (order,index) {
                    var fileReader = new FileReader();
                    fileReader.onload = function (e) {

                    var img64 = {
                                  name : files[index].name,
                                  link : fileReader.result,
                                  order : order
                    };
                    //sort order to similar as raw files
                    if( files.length > sortArray.length){
                      sortArray.push(img64);

                      if(files.length === sortArray.length){

                        sortArray.sort(function (a , b) {
                          return a.order-b.order
                        });
                        $scope.$apply(that.picture = that.picture.concat(sortArray));
                      }
                    }


                    };
                    fileReader.readAsDataURL(files[i]);
                  })(order,i)
                    order++; //increase every loop to sort by order later
                     //encode file to base64
                  }

                  } else {
                    this.state = 1; //show error gallery image
                  }
            };

            this.add = function () {
                this.state = 10; //show complete bar&hide submit button
                var product_obj = {
                  name : $scope.product.input.name ,
                  time : $scope.product.input.time ,
                  description : $scope.product.input.description , //all description such as W H L
                  img : [] ,
                  coverImg : 0 ,
                  price : $scope.product.input.price
                };
                var data ={};

                var createPro = function (arrayData,file) {
                  for(var i = 0 ; i<arrayData.length ; i++){
                      data = {
                          link: arrayData[i].link,
                          deletehash: arrayData[i].deletehash,
                          order: arrayData[i].title,
                          width: file[i].width,
                          height: file[i].height
                      };
                      //add images to product object
                      product_obj.img.push(data);
                      product_obj.coverImg = that.pointer;
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

                  imgur.post( that.picture , processBar )
                    .then(
                      function (res) {
                        createPro( res.arrayData , res.file );
                      }
                    );
            };

            this.setCover = function (index) {
              this.pointer = index;
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
                $( window ).off('resize');
                $(".short-description").off('keyup');
            });


  }]
 );
})()
