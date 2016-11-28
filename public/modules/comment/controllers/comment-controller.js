(function () {
  angular.module('comment')
    .controller( 'commentController' , [ '$http' , '$scope' , '$compile' , '$timeout' , '$rootScope' , 'modalAuthService' ,
     function ( $http , $scope , $compile , $timeout , $rootScope , modalAuthService) {
      var that = this ;

      this.post_avatar =  $rootScope.avatarImage && $rootScope.avatarImage.img[0] ? $rootScope.avatarImage.img[$rootScope.avatarImage.pointer].link : "http://www.premiumdxb.com/assets/img/avatar/default-avatar.jpg";
      this.all_comment = [];
      this.state_clicked = true;
      this.state_answer_open = false;
      this.clicked = function () {
        this.state_clicked = false;
      };

      this.postComment = function () {
          //check user login
        if ($rootScope.user !== undefined || $rootScope.user){
              var message = $scope.message;
              //check is there message
              if (!$scope.message) {

                return null;
              }
              var messages = {
                message : message,
                mode : 'new',
                product_id : $scope.pro
              };
            $http.post('/api/comment/'+$scope.com , messages).then(
              function (responce) {
                $scope.message = '';
              }
            ); //responce by io.emit from server
        } else {
          modalAuthService.open();
        }

      };

      this.trigger_comment = function () {

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


          });
        $http.get( '/api/comment/' + $scope.com ).then(function (res) {
          that.all_comment = res.data.comment.reverse() ;

        });
      };


      this.answer = function (index , replied_username ) {
            if ($rootScope.user !== undefined || $rootScope.user){
              $timeout(function () {
                  var close = $('.comment-close');
                  close.click();
                  var select = `.comment-content.no-${index}`;

                  var element = $compile(`<div comment-answer no = "${index}" id = "${that.all_comment[index]._id}" replied = "${replied_username}"></div>`)( $scope );
                    $( select ).append( element );
              }, 0);
            } else {
              modalAuthService.open();
            }
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
