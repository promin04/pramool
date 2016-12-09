(function () {
  angular.module('imgServices')
  .service('imgur',['$http', '$q' ,function ( $http , $q ) {

    this.post = function ( file , processBar ) {

      console.log(file);
      var arrayData = [];
      var deferred = $q.defer();
      if(!file[0]){
        //send data
        deferred.resolve({
          file : file ,
          arrayData : arrayData
        });
        //return promise to chain then
        return deferred.promise;
      }
      for(var i = 0 ; i < file.length ; i++){

        //closure fn
      (function (index) {
        //due to title cannot set 0 that result = 'null', so it must i+1 (if i=0)

        console.log(index,'index');
        var base64 = file[index].link;
        var arrayBase64 = base64.split(",");
        console.log(arrayBase64[0],arrayBase64.length);

        var demo = {
            url: 'https://api.imgur.com/3/image',
            method: 'POST',
            headers: {
              Authorization: 'Client-ID 18f8382f95b805f',
              Accept: 'application/json'
            },
            data: {
              image: arrayBase64[1],
              type: 'base64',
              title: file[index].order,
              name : file[index].name
            }

        };

          $http(demo).then(function(response) {
                //success
                    arrayData.push(response.data.data);
                    processBar(arrayData.length,file.length);
                    if(arrayData.length === file.length){

                      arrayData.sort(
                        function(a, b){
                            return a.title-b.title
                      });
                      //send data when last loop
                      deferred.resolve({
                        file : file ,
                        arrayData : arrayData
                      });

                      console.log(arrayData);
                    }
            }, function(reject) {
              console.log('error',reject);
            });

})(i);
    }
    //return promise to chain then
    return deferred.promise;
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
            console.log(res.data ,'delete ' + i);
          });
        })(i)

      }
    }
  }])
})()
