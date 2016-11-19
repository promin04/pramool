(function () {
  angular.module('comment',['ngSanitize'])
    .directive('commentBoard',function ($timeout) {
      

      return {
        restrict : 'A' ,
        scope : { pro : '@' , com : '@' },
        templateUrl : './modules/comment/views/comment.jade',
        controller : 'commentController' ,
        controllerAs : 'comment' ,

      }
    });

})()
