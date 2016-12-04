(function () {
  angular.module('dashboard')
    .controller( 'profileController' ,[ 'modalService' , '$scope' , '$http' ,function ( modalService , $scope , $http ) {
      var option = {
        animation : true ,
        windowClass: 'noAnimate',
        backdropClass: 'noAnimate',
        templateUrl : './modules/dashboard/views/editAvatar.jade',
        controller : ['$http','$rootScope','imgur', '$uibModalInstance' , '$scope' , 'imgManager' ,
        function ( $http , $rootScope , imgur , $uibModalInstance , $scope , imgManager ) {
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
            imgManager.set( this.oldPic , this.picture , this.pointer )
            this.prepare = function (files) {
             imgManager.prepare(files).then(function (res) {
                that.picture = res.picture;
              });
            };

            this.picRemove = function (index) {
              var data = imgManager.picRemove(index);
              this.picture = data.picture;
              this.pointer = data.pointer;
            }

            this.combine = function ( oldPic, newPic) {
              //createPro is callback for imgManager API
              var createPro = function (array_add , file , array_remain) {
                var pro = {
                            img : [],
                            pointer : 0
                          };
                var data ={};
                var arrayData = array_remain.concat( array_add );
                for(var i = 0 ; i<arrayData.length ; i++){
                    data = {
                              name : arrayData[i].name,
                              link : arrayData[i].link,
                              deletehash : arrayData[i].deletehash
                            };
                    pro.img.push(data);
                    pro.pointer = that.pointer;
                }
                $http.post('/api/user-avatar-update',pro)
                  .then(
                      function (res) {
                        $rootScope.avatarImage = res.data.avatarImage;
                        $uibModalInstance.close();
                      }
                  );
              }
              //imgManager API
              imgManager.combine(oldPic, newPic)
                .then(
                  function (res) {
                    createPro( res.arrayData , res.file , res.array_remain);
                  }
                );

            }

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
