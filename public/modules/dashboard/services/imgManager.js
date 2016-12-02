(function () {
  angular.module('dashboard')
    .service('imgManager',['$http' , 'imgur' , '$scope',
    function ($http , imgur , $scope ) {

      var that = this;
      var order = 1;
      this.oldPic = [];
      this.picture = []
      this.pointer = 0;

      this.set = function ( oldPic , picture , pointer ) {
        this.oldPic = oldPic;
        this.picture = picture;
        this.pointer = pointer;
        var order = 1;
      }

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
        imgur.remove( array_remove );
      }

      this.compare = function ( oldPic , newPic ) {
        var lists = {
          remove : oldPic,
          add : newPic,
          remain : []
        };
        // filter remove and add
        for (var i = 0; i < oldPic.length; i++) {
          for (var j = 0 ; j < newPic.length; j++) {

                if(oldPic[i].deletehash === newPic[j].deletehash){
                  var removeIndex = lists.remove.findIndex(function (currentValue) {
                                    return currentValue.deletehash ===  oldPic[i].deletehash
                                  });
                  var removeAdd = lists.add.findIndex(function (currentValue) {
                                    return currentValue.deletehash ===  oldPic[i].deletehash
                                  });

                  var remaining = lists.remove.splice( removeIndex , 1 );
                                  lists.add.splice( removeAdd , 1 );
                                  lists.remain.push( remaining[0] );
                  break;
                }
          }
        }

        return lists;
      }

      this.add = function ( array_add , array_remain , url ) {

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
          $http.post(url , pro).then(function (res) {
            console.log('user-avatar-update res',res.data);
          });
          }

          var processBar = function (complete,total) {
            that.processBar = complete/total*100;
          }
          //imgur service API for save 64bit to imgur host
          imgur.post( array_add , processBar ,array_remain )
            .then( function (res) {
                      createPro( res.arrayData , res.file , res.array_remain );
                  }
            );
      };

      this.setCover = function (index) {
        this.pointer = index;
        console.log(this.pointer,'setcover');
      }

    }])
})()
