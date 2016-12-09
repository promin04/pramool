(function () {
  angular.module('imgServices')
    .service('imgManager',['$http','imgur','$q',function ($http,imgur,$q) {

      var that = this;
      var order = 1;
      this.oldPic = [];
      this.picture = [];
      this.pointer = 0;

      this.set = function ( oldPic , picture , pointer ) {
        var order = 1;
        this.oldPic = oldPic;
        this.picture = picture;
        this.pointer = pointer;
        console.log(oldPic , picture , pointer);
      }

      this.processBar = 0;

      this.prepare = function (files) {
            var deferred = $q.defer();
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
                  if( files.length > sortArray.length ){
                    sortArray.push(img64);
                    console.log(files.length,sortArray.length,'all files');
                    if( files.length === sortArray.length ){
                      console.log('work');
                      sortArray.sort(function (a , b) {
                        return a.order-b.order
                      });
                      that.picture = that.picture.concat( sortArray );
                      deferred.resolve( { picture : that.picture } );
                      console.log(that.picture,'that.picture');
                    }
                  }


              };
              fileReader.readAsDataURL(files[i]); //encode file to base64
            })(order,i)
              order++; //increase every loop to sort by order later
            }
            return deferred.promise;
            }
      };

      this.picRemove = function (index) {
        var test = this.picture.splice(index,1);
        if(index < this.pointer){
          this.pointer -= 1;
          return {
            picture : that.picture ,
            pointer : that.pointer
          };
        } else if (index === this.pointer && !this.picture[index+1] && this.picture[index-1]) {
            this.pointer -= 1;
            return {
              picture : that.picture ,
              pointer : that.pointer
            };
          }else {
            return {
              picture : that.picture ,
              pointer : that.pointer
            };
          }
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

      this.remove = function ( array_remove ) {
        imgur.remove( array_remove );
      }

      this.add = function ( array_add , array_remain ) {
          var processBar = function (complete,total) {
            that.processBar = complete/total*100;
          }
          //imgur service API for save 64bit to imgur host
          //return promise to chain 'then'
      return  imgur.post( array_add , processBar )
                .then(
                  function (res) {
                    var result = {
                      file : res.file ,
                      arrayData : res.arrayData ,
                      array_remain : array_remain
                    };

                    return result;
                  }
                );

      };

      this.combine = function ( oldPic, newPic) {
        // 1.compare 2.remove 3.add
        var lists_remove_add = this.compare( oldPic , newPic );
        this.remove( lists_remove_add.remove );
        var promise = this.add( lists_remove_add.add , lists_remove_add.remain );
        return promise;
      }

    }])
})()
