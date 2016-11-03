(function () {
  angular.module('main')
  .service('imgur',['$http',function ($http) {
    this.post = function (file ,processBar, callback ,array_remain) {

      console.log(file);

      var arrayData = [];
      if(!file[0]){
        return callback( arrayData , file , array_remain );
      }
      for(var i = 0 ; i < file.length ; i++){


      console.log(i,'i');
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
                arrayData.sort(function(a, b){
                  return a.title-b.title});
                console.log(arrayData);
                return callback( arrayData , file , array_remain );
              }
          }, function(reject) {
            console.log('error',reject);
          });


})(i);
    }
    }

  }])
})()
