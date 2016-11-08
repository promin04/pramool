(function () {
  angular.module('comment')
    .controller( 'commentController' , [ '$http' , '$scope' , '$compile' , function ( $http , $scope , $compile ) {
      var that = this ;
      this.all_comment = [];
      this.state_clicked = true;

      this.clicked = function () {
        this.state_clicked = false;
      };

      this.postComment = function () {
          var message = {
            message : $scope.message,
            mode : 'new',
            product_id : $scope.pro
          };
        $http.post('/comment/'+$scope.com , message); //responce by io.emit from server
      };

      this.trigger_comment = function () {
          console.log($scope.com ,'commnet id');
          socket.on( 'comment' , function ( comment ) {
            console.log(comment,'comment');
            that.all_comment.push(comment);
          });
        $http.get( '/comment/' + $scope.com ).then(function (res) {
          that.all_comment = res.data.comment ;
          console.log(res.data ,'commnet');
        });
      };


      this.answer = function (index) {
        console.log('work');
        var select = '.no-' + index;
        var element = $compile('<div comment-answer id="'+that.all_comment[index]._id +'"></div>')( $scope );
          $( select ).append( element );
      };

      this.trigger_comment(); // initial

      $scope.$on('$destroy', function (event) {
        console.log('destroy comment');
          socket.removeListener('comment');
      });
    }]);
})()
