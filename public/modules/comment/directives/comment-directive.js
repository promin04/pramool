(function () {
  angular.module('comment',[])
    .directive('commentBoard',function () {
      var link = function (scope , element , attrs) {
    
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
