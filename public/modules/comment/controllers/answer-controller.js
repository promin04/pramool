(function () {
  angular.module('comment')
    .controller( 'answerController' , [ '$http' , '$scope' , '$rootScope' , function ($http , $scope , $rootScope) {

      this.ansComment = function () {
                //check user login
              if ($rootScope.user !== undefined || $rootScope.user){
                  //check is there message
                  if (!$scope.message[0]) {
                    return null;
                  }
                  var message = {
                    _id : $scope.id, //post_id
                    replied_username : $scope.replied ,
                    message : $scope.message,
                    mode : 'answer',
                    product_id : $scope.$parent.pro
                  };

                    $http.post('/comment/'+$scope.$parent.com , message).then(
                      function (responce) {
                        $scope.message = '';
                      }
                    ); //responce by io.emit from server
              }
      };

    }] );
})()
