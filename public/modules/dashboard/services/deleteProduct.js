(function () {
  angular.module('dashboard')
    .service('deleteProduct',['$http','$q',function ($http,$q) {
        this.delete = function (_id,arrayImg) {

          var defer = $q.defer();
          for (var i = 0; i < arrayImg.length; i++) {

                      (function ( index ) {

                        $http.delete('https://api.imgur.com/3/image/'+arrayImg[index].deletehash,
                            {
                                headers: {
                                  Authorization: 'Client-ID 18f8382f95b805f',
                                }
                            }
                          )
                          .then(function (response) {

                              console.log('already done  // '+index,response,arrayImg[index].deletehash);
                              if(index === arrayImg.length-1){
                                console.log('start delete');

                                  $http.delete('/product/'+_id).then(function (response) {
                                          console.log('All done',response);
                                          defer.resolve(response);
                                        });


                              }
                            });

                      })( i )


        }
        return defer.promise;

      };

    }])
})()
