(function () {
  angular.module('comment',[])
    .directive('commentBoard',function ($timeout) {
      var link = function (scope , element , attrs) {

        $timeout(function () {

          console.log($('.comment-each').height());
          console.log(element.height());
        }, 10);

      }

      return {
        restrict : 'A' ,
        scope : { pro : '@' , com : '@' },
        templateUrl : './modules/comment/views/comment.jade',
        controller : 'commentController' ,
        controllerAs : 'comment' ,
        link : link
      }
    });

})()
