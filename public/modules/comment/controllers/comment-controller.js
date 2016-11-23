(function () {
  angular.module('comment')
    .controller( 'commentController' , [ '$http' , '$scope' , '$compile' , '$timeout' , '$rootScope'  , function ( $http , $scope , $compile , $timeout , $rootScope ) {
      var that = this ;
      this.post_avatar =  $rootScope.avatarImage && $rootScope.avatarImage.img[0] ? $rootScope.avatarImage.img[$rootScope.avatarImage.pointer].link : "http://www.premiumdxb.com/assets/img/avatar/default-avatar.jpg";
      this.all_comment = [];
      this.state_clicked = true;
      this.state_answer_open = false;
      this.clicked = function () {
        this.state_clicked = false;
      };

      this.postComment = function () {
        console.log('portComment');

        var message = $scope.message;


          var message = {
            message : message,
            mode : 'new',
            product_id : $scope.pro
          };
        $http.post('/comment/'+$scope.com , message).then(
          function (responce) {
            $scope.message = '';
          }
        ); //responce by io.emit from server
      };

      this.trigger_comment = function () {
          console.log($scope.com ,'commnet id');
          socket.on( 'comment' , function ( comment ) {
            switch (comment.mode) {

              case 'new':
                    $scope.$apply(that.all_comment.unshift(comment.data));
                break;

              case 'answer':
                    for (var i = 0; i < that.all_comment.length; i++) {
                      if(  that.all_comment[i]._id == comment._id ){
                        $scope.$apply(that.all_comment[i].answer.push( comment.data ));
                      }
                    }
                break;

              default:
                        $scope.$apply(that.all_comment.unshift(comment.data));
                break;
            }
            console.log(comment,'comment');

          });
        $http.get( '/comment/' + $scope.com ).then(function (res) {
          that.all_comment = res.data.comment.reverse() ;
          console.log(res.data ,'commnet');
        });
      };


      this.answer = function (index , replied_username ) {

          $timeout(function () {
              var close = $('.comment-close');
              close.click();
              var select = `.comment-content.no-${index}`;

              var element = $compile(`<div comment-answer no = "${index}" id = "${that.all_comment[index]._id}" replied = "${replied_username}"></div>`)( $scope );
                $( select ).append( element );

          }, 0);

      };

      this.trigger_comment(); // initial

      var clearWatchAvatar = $rootScope.$watch('avatarImage',function (newValue, oldValue) {
        that.post_avatar = $rootScope.avatarImage && $rootScope.avatarImage.img[0] ? $rootScope.avatarImage.img[$rootScope.avatarImage.pointer].link : "http://www.premiumdxb.com/assets/img/avatar/default-avatar.jpg";
                      });

      $scope.$on('$destroy', function (event) {
        console.log('destroy comment');
          clearWatchAvatar();
          socket.removeListener('comment');
      });



    }]);
})()
