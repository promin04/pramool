(function () {
  angular.module('store')
    .service('following',['$http',function ($http) {

      this.follow = function (product_id) {
        return  $http.post('/following',{
          _id : product_id,
          mode: 'follow'
        })
        .then(function (response) {
            console.log('already follow',response.data);
            return response.data;
        });
      };

      this.unFollow = function (product_id) {
        return  $http.post('/following',{
          _id : product_id,
          mode: 'unfollow'
        })
        .then(function (response) {
            console.log('already unfollow',response.data);
            return response.data;
        });
      };

      this.check = function (follow,user) {
        if(user && follow.length!==0){

            for(var i=0 ;i < follow.length;i++){

              if (follow[i].username === user) {
                return true;

              }else if (i===follow.length-1) {
                return false;
              }
            }

        }else {
            return false;
        }
      }

    }])
})()
