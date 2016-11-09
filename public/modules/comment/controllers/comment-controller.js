(function () {
  angular.module('comment')
    .controller( 'commentController' , [ '$http' , '$scope' , '$compile' , '$timeout' , function ( $http , $scope , $compile , $timeout ) {
      var that = this ;
      this.all_comment = [];
      this.state_clicked = true;
      this.state_answer_open = false;
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
            switch (comment.mode) {

              case 'new':
                    that.all_comment.push(comment.data);
                break;

              case 'answer':
                    for (var i = 0; i < that.all_comment.length; i++) {
                      if(  that.all_comment[i]._id == comment._id ){
                        that.all_comment[i].answer.push( comment.data );
                      }
                    }
                break;

              default:
                      that.all_comment.push(comment.data);
                break;
            }
            console.log(comment,'comment');

          });
        $http.get( '/comment/' + $scope.com ).then(function (res) {
          that.all_comment = res.data.comment ;
          console.log(res.data ,'commnet');
        });
      };


      this.answer = function (index) {

          $timeout(function () {
              var close = $('.comment-close');
              close.click();
              var select = '.no-' + index;
              var element = $compile('<div comment-answer id="'+that.all_comment[index]._id +'"></div>')( $scope );
                $( select ).append( element );

          }, 0);

      };

      this.trigger_comment(); // initial

      $scope.$on('$destroy', function (event) {
        console.log('destroy comment');
          socket.removeListener('comment');
      });

    }]);
})()
