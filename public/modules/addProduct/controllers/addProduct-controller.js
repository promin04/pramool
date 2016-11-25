(function () {
  angular.module( 'addProduct' )
    .controller( 'addProductController' , ['$http','imgur','$state','$timeout','$scope',
    function ( $http , imgur , $state , $timeout , $scope , modalService ) {
    
            var that = this;
            var imgWidth;
            var imgHeight;
            var order = 1;
            this.picFile = null;
            this.state = null;
            this.picture = [];
            this.pointer = 0; //position of array picture that is a cover image.
            this.processBar = 0;
            this.classImg = true ;
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
                      console.log(files.length,sortArray.length,'all files');
                      if(files.length === sortArray.length){
                        console.log('work');
                        sortArray.sort(function (a , b) {
                          return a.order-b.order
                        });
                        $scope.$apply(that.picture = that.picture.concat(sortArray));

                        console.log(that.picture,'that.picture');
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
                var pro = {
                  name : $scope.product.input.name ,
                  time : $scope.product.input.time ,
                  description : $scope.product.input.description ,
                  img : [] ,
                  coverImg : 0 ,
                  price : $scope.product.input.price
                };
                var data ={};
              //  pro.img = [];
                var createPro = function (arrayData,file) {
                  for(var i = 0 ; i<arrayData.length ; i++){
                      data = {
                          link: arrayData[i].link,
                          deletehash: arrayData[i].deletehash,
                          order: arrayData[i].title,
                          width: file[i].width,
                          height: file[i].height
                      };
                      pro.img.push(data);
                      pro.coverImg = that.pointer;
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

            this.setCover = function (index) {
              this.pointer = index;
              this.changeClass();
            }

            $scope.$on('$destroy', function (event) {
              console.log('destroy');
                $( window ).off('resize');
                $(".short-description").off('keyup');
            });


  }]
 );
})()
