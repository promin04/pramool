(function () {
  angular.module('dashboard')
    .controller( 'profileController' ,[ 'modalService' , '$scope' , '$http' ,function ( modalService , $scope , $http ) {
      var option = {
        animation : true ,
        windowClass: 'noAnimate',
        backdropClass: 'noAnimate',
        templateUrl : './modules/dashboard/views/editAvatar.jade',
        controller : ['$http','$rootScope','imgur', '$uibModalInstance' , '$scope' ,
        function ( $http , $rootScope , imgur , $uibModalInstance , $scope ) {
            var that = this;
            var order = 1;
            this.oldPic = angular.copy($scope.avatarImage.img);
            this.picture = angular.copy($scope.avatarImage.img);
            this.pointer = angular.copy($scope.avatarImage.pointer)||'0';

            $scope.$watch('editAvatar.pointer',function (newValue, oldValue) {

              if ( (newValue == oldValue) ) {
                that.setCover(+newValue);
              }
            });

            this.processBar = 0;

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
                                  order : order,

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
                        that.picture = that.picture.concat(sortArray);
                        console.log(that.picture,'that.picture');
                      }
                    }


                    };
                    fileReader.readAsDataURL(files[i]); //encode file to base64
                  })(order,i)
                    order++; //increase every loop to sort by order later

                  }

                  } else {
                    this.state = 1; //show error gallery image
                  }
            };

            this.picRemove = function (index) {

              this.picture.splice(index,1);
              if(index < this.pointer){
                this.pointer -= 1;
              } else if (index === this.pointer && !this.picture[index+1] && this.picture[index-1]) {
                  this.pointer -= 1;
                }

              console.log(this.pointer,'point');

            }

            this.combine = function ( oldPic, newPic) {
              var lists_remove_add = this.compare( oldPic , newPic );
              this.remove( lists_remove_add.remove );
              this.add( lists_remove_add.add , lists_remove_add.remain );
            }

            this.remove = function ( array_remove ) {
              var route = '';
              for (var i = 0; i < array_remove.length; i++) {
                (function () {
                  route = 'https://api.imgur.com/3/image/' + array_remove[i].deletehash;
                  $http.delete( route ,{
                            headers: {
                              Authorization: 'Client-ID 18f8382f95b805f',
                            }
                  }).then(function (res) {
                    console.log('delete ' + i);
                  });
                })(i)

              }
            }

            this.compare = function ( oldPic , newPic ) {
              var lists = {
                remove : angular.copy(oldPic),
                add : angular.copy(newPic),
                remain : []
              };
              // filter remove and add
              for (var i = 0; i < oldPic.length; i++) {
                for (var j = 0 ; j < newPic.length; j++) {
                      console.log(oldPic[i].deletehash , newPic[j].deletehash ,i,j,'checkkkkk');
                      if(oldPic[i].deletehash === newPic[j].deletehash){
                        var removeIndex = lists.remove.findIndex(function (currentValue) {
                                          return currentValue.deletehash ===  oldPic[i].deletehash
                                        });
                        var removeAdd = lists.add.findIndex(function (currentValue) {
                                          return currentValue.deletehash ===  oldPic[i].deletehash
                                        });
                        console.log(removeIndex,removeAdd,'indexxxx');
                        var remaining = lists.remove.splice( removeIndex , 1 );
                                        lists.add.splice( removeAdd , 1 );
                                        lists.remain.push( remaining[0] );
                        break;
                      }
                }
              }
              console.log(lists,'lists 55555');
              return lists;
            }

            this.add = function ( array_add , array_remain ) {

                this.state = 10; //show complete bar&hide submit button
                var pro = {
                  img : [],
                  pointer : 0
                };
                var data ={};

                var createPro = function (array_add , file , array_remain) {
                  var arrayData = array_remain.concat( array_add );
                  console.log(arrayData, array_remain , array_add ,'arrayData');
                  for(var i = 0 ; i<arrayData.length ; i++){
                      data = {
                          name : arrayData[i].name,
                          link : arrayData[i].link,
                          deletehash : arrayData[i].deletehash
                      };
                      pro.img.push(data);
                      pro.pointer = that.pointer;
                  }
                  console.log(pro,'before save');
                $http.post('/api/user-avatar-update',pro).then(function (res) {
                  console.log('user-avatar-update res',res.data);
                  $rootScope.avatarImage = res.data.avatarImage;
                  $uibModalInstance.close();

                });
                }

                var processBar = function (complete,total) {
                  that.processBar = complete/total*100;
                }
                  imgur.post( array_add , processBar , createPro ,array_remain );
            };

            this.setCover = function (index) {
              this.pointer = index;
              console.log(this.pointer,'setcover');
            }


        }] ,
        controllerAs : 'editAvatar'
      }

      this.avatarEditor = function () {
        modalService.open(option);
      };




    }]);
})()
