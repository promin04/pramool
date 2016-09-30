(function () {
  angular.module('dashboard')
    .service('deleteProduct',['$http','$q',function ($http,$q) {
        this.delete = function (_id,arrayImg) {
          var count = 0;
          var defer = $q.defer();
          for (var i = 0; i < arrayImg.length; i++) {


                          $http.delete('https://api.imgur.com/3/image/'+arrayImg[i].deletehash,
                              {
                                  headers: {
                                    Authorization: 'Client-ID 18f8382f95b805f',
                                  }
                              }
                            )
                            .then(function (response) {
                                count++;
                                console.log('already done  // '+count,response);
                                if(count === arrayImg.length){
                                  console.log('start delete');

                                    $http.delete('/product/'+_id).then(function (response) {
                                            console.log('All done',response);
                                            defer.resolve(response);
                                          });


                                }
                              });

        }
        return defer.promise;

      };

    }])
})()
