(function () {
  angular.module('comment')
    .controller( 'answerController' , [ '$http' , '$scope' , function ($http , $scope) {

      this.ansComment = function () {

                  var message = {
                    _id : $scope.id,
                    message : $scope.message,
                    mode : 'answer',
                    product_id : $scope.$parent.pro
                  };

        $http.post('/comment/'+$scope.$parent.com , message); //responce by io.emit from server
      };

    }] );
})()
