(function () {
  angular.module('addProduct')
  .service('imgur',['Upload',function (Upload) {
    this.post = function (file , callback) {

      console.log(file);
      var arrayData = [];

      for(var i = 0 ; i < file.length ; i++){
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file[i]);
      console.log(i,'i');
        //closure fn
      (function (order) {
        //due to title cannot set 0 that result = 'null', so it must i+1 (if i=0)
      fileReader.onload = function(e) {
        console.log(order,'order=i+1');
        var base64 = e.target.result;
        var arrayBase64 = base64.split(",");
        console.log(arrayBase64[0],arrayBase64.length);

        var demo = {
            url: 'https://api.imgur.com/3/image',
            type: 'POST',
            headers: {
              Authorization: 'Client-ID 18f8382f95b805f',
              Accept: 'application/json'
            },
            data: {
              image: arrayBase64[1],
              type: 'base64',
              title: order
            }

        };

          Upload.http(demo).then(function(response) {
              //success;
              arrayData.push(response.data.data);

              if(arrayData.length === file.length){
                arrayData.sort(function(a, b){
                  return a.title-b.title});
                console.log(arrayData);
                callback(arrayData);
              }
          }, function(reject) {
            console.log('error',reject);
          });


      }
})(i+1);
    }
    }

  }])
})()
