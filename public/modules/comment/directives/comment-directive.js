(function () {
  angular.module('comment',['ngSanitize'])
    .directive('commentBoard',function ($timeout) {
      var link = function (scope , element , attr , ctrl) {



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
